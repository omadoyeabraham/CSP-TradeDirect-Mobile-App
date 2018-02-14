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
  public activePortfolioMetaData$: Observable<IStbActivePortfolioMetaData>;
  public portfolios: Array<IPortfolio>;
  public numberOfPortfolios$: Observable<number>;
  public activeSlideIndex: number;

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

    // Default index of the slide selected
    this.activeSlideIndex = 1;

    //TODO: use map or mergeMap to merge activePortfolio$ and activePortfolioMetaData$
  }

  /**
   *
   *
   * @memberof SwitchPortfolioComponent
   */
  portfolioChanged() {
    // The current portfolio index from the slider (+ 1 because the array is zero indexed)
    this.activeSlideIndex = this.slides.getActiveIndex() + 1;
    const portfolioIndex = this.slides.getActiveIndex();
    // Get the currentPortfolio based on the index slid to
    const nextActivePortfolio = this._portfolios[portfolioIndex];

    // Dispatch an action to change the current portfolio in the store
    this.stbPortfolioActionDispatcher.setActivePortfolioInStore(
      nextActivePortfolio
    );

    // Dispatch an action to change the current portfolio metadata in the store
    this.stbPortfolioActionDispatcher.setActivePortfolioMetaData(
      nextActivePortfolio
    );

    /**
     * Tell system that
     *   + get me the new current portfolio, based on the index
     *   + get me the new current portfolio metadata based on the current portfolio
     */
  }
}
