import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import {
  getUserState,
  getActivePortfolio,
  AuthActionDispatcher
} from "../../../../store";
import { IAppState, IUserState } from "../../../../store/models";
import * as selectors from "../../../../store/selectors";
import { IPortfolioHolding } from "../../../models/portfolioHolding.interface";
import { IPortfolio } from "../../../models";
import { AuthProvider } from "../../../../sharedModule/services/auth/auth";

/**
 * Container component for stockbroking portfolio holdings
 * This component handles all redux activities related to portfolio holdings
 *
 * @type Container/Smart component
 * @export
 * @class StbPortfolioHoldingsContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-portfolio-holdings-container",
  templateUrl: "stb-portfolio-holdings-container.html"
})
export class StbPortfolioHoldingsContainerPage {
  public activePortfolioStockHoldings: IPortfolioHolding[];
  public activePortfolioBondHoldings: IPortfolioHolding[];
  public user: IUserState;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<IAppState>,
    private authProvider: AuthProvider,
    private authActionDispatcher: AuthActionDispatcher
  ) {}

  ionViewDidLoad() {
    this.getUserState();

    // Subscribe to stock holdings of the currently selected portfolio
    this.store
      .select(selectors.getActivePortfolioStockHoldings)
      .subscribe(stockHoldings => {
        this.activePortfolioStockHoldings = stockHoldings;
      });

    // Subscribe to bond holdings of the currently selected portfolio
    this.store
      .select(selectors.getActivePortfolioBondHoldingsWithMetaData)
      .subscribe(bondHoldings => {
        this.activePortfolioBondHoldings = bondHoldings;
      });
  }

  getUserState() {
    this.store
      .select(getUserState)
      .subscribe(userState => (this.user = userState));
  }

  /**
   * Refresh the user's stockbroking data
   *
   * @param {any} refresher
   * @memberof StbTradeHistoryContainerPage
   */
  doRefresh(refresher) {
    // Update the user data
    this.authProvider.getUserData(this.user.id).subscribe(
      response => {
        let activePortfolioID: number;
        this.store
          .select(getActivePortfolio)
          .subscribe((portfolio: IPortfolio) => {
            activePortfolioID = portfolio.id;
          });

        this.authActionDispatcher.updateUserDataInStore(
          response,
          activePortfolioID
        );
        refresher.complete();
      },
      err => {
        console.log(err);
        refresher.cancel();
      }
    );
  }
}
