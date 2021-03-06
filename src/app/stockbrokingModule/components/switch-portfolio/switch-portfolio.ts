import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { Slides } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { IAppState, IStbActivePortfolioMetaData } from "../../../store/models";
import * as selectors from "../../../store/selectors/stockbroking/portfolios.selectors";
import { IPortfolio } from "../../models/portfolio.interface";
import { StbPortfolioActionDispatcher } from "../../../store";

/**
 * Component used to switch between the user's STB portfolios
 * This component is declared and exported by the StockbrokingModule, and the STB pages (each individual modules courtesy ionic) import the StockbrokingModule so they can use this component.
 *
 * @type Smart component
 * @export
 * @class SwitchPortfolioComponent
 */
@Component({
  selector: "csmobile-switch-portfolio",
  templateUrl: "switch-portfolio.html"
})
export class SwitchPortfolioComponent implements OnInit {
  @Input() showTotalValue: boolean;
  @Input() showCashAvailableForTrading: boolean;
  // Expose the slides in the slider to the class for tracking and appropriate update
  @ViewChild(Slides) slides: Slides;

  public portfolios$: Observable<Array<IPortfolio>>;
  private _portfolios: Array<IPortfolio>;
  public activePortfolio$: Observable<IPortfolio>;
  public _activePortfolio: IPortfolio;
  public activePortfolioMetaData$: Observable<IStbActivePortfolioMetaData>;
  public portfolios: Array<IPortfolio>;
  public numberOfPortfolios$: Observable<number>;
  public activeSlideIndex: number = 1;

  constructor(
    private store: Store<IAppState>,
    private stbPortfolioActionDispatcher: StbPortfolioActionDispatcher
  ) {}

  ngOnInit() {
    /**
     * Select needed slices of state from the store
     */
    this.portfolios$ = this.store.select(selectors.getStbPortfolios);
    this.numberOfPortfolios$ = this.store.select(
      selectors.getNumberOfStbPortfolios
    );
    this.activePortfolio$ = this.store.select(selectors.getActivePortfolio);
    this.activePortfolioMetaData$ = this.store.select(
      selectors.getActivePortfolioMetaData
    );

    // Update the component's portfolios array whenever the store's portfolios are updated
    this.portfolios$.subscribe((portfolios: Array<IPortfolio>) => {
      this._portfolios = portfolios;
    });

    /**
     * Set the active portfolio index, whenver the active portfolio is changed, this also ensures
     * that this component retains the last selected portfolio even when used on different pages,
     * as the store is the single source of truth for it.
     */
    this.activePortfolio$.subscribe(activePortfolio => {
      this._activePortfolio = activePortfolio;

      // Get the index of the active portfolio in the portfolios array
      let activeSlideIndex = this._portfolios.findIndex((portfolio, index) => {
        return portfolio.id === this._activePortfolio.id;
      });

      /**
       * Slide to the active portfolio (in the slider view), using this private fn which handles
       * some ionic specific slider bugs
       */
      this._recursiveSlideTo(activeSlideIndex);
    });

    //TODO: use map or mergeMap to merge activePortfolio$ and activePortfolioMetaData$
  }

  /**
   * Called when the active portfolio is changed by sliding the slider component
   *
   * @memberof SwitchPortfolioComponent
   */
  portfolioChanged() {
    // Get the active slide index
    let portfolioIndex = this.slides.getActiveIndex();
    let numberOfSlides = this.slides.length();

    // Check to ensure that when the slider overshoots it's index, we revert back to the last index
    if (portfolioIndex === numberOfSlides) {
      portfolioIndex = portfolioIndex - 1;
    }

    // Show the activeIndex + 1 in the template, because it's zero indexed
    this.activeSlideIndex = portfolioIndex + 1;

    /**
     * Set the active portfolio, based on the index of the slider that the user slid to.
     * Also account for edge cases by reverting to the last portfolio when the user tries to
     * slide past the allowable index
     */
    const nextActivePortfolio = this._portfolios[portfolioIndex];

    // Dispatch an action to change the current portfolio in the store
    this.stbPortfolioActionDispatcher.setActivePortfolioInStore(
      nextActivePortfolio
    );
    // Dispatch an action to change the current portfolio metadata in the store
    this.stbPortfolioActionDispatcher.setActivePortfolioMetaData(
      nextActivePortfolio
    );
  }

  /**
   * Call the _slideTo fn recursively, until the slideTo is available.
   * This is needed because of the ionic slide bug detailed @ https://github.com/ionic-team/ionic/issues/10271
   *
   * @private
   * @param {number} slideIndex
   * @returns {Promise<void>}
   * @memberof SwitchPortfolioComponent
   */
  private _recursiveSlideTo(slideIndex: number): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      let tryCount: number = 0;
      this._slideTo(slideIndex, tryCount, resolve, reject);
    });
  }

  /**
   * Workaround function used to handle the ionic slides bug detailed at https://github.com/ionic-team/ionic/issues/10271
   *
   * @private
   * @param {number} slideIndex
   * @param {number} tryCount
   * @param {Function} resolve
   * @param {Function} reject
   * @memberof SwitchPortfolioComponent
   */
  private _slideTo(
    slideIndex: number,
    tryCount: number,
    resolve: Function,
    reject: Function
  ): void {
    try {
      this.slides.slideTo(slideIndex, 0);
      resolve();
    } catch (error) {
      if (tryCount < 100) {
        tryCount++;
        setTimeout(
          () => this._slideTo(slideIndex, tryCount, resolve, reject),
          50
        );
      } else {
        reject(error);
      }
    }
  }
}
