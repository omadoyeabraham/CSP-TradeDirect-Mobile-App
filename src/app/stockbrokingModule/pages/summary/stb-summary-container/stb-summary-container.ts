import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import {
  getUserState,
  getActivePortfolio,
  AuthActionType,
  AuthActionDispatcher
} from "../../../../store";
import { IAppState, IUserState } from "../../../../store/models";
import { IPortfolio } from "../../../models/portfolio.interface";
import * as selectors from "../../../../store/selectors";
import { ChartsProvider } from "../../../providers/charts/charts";
import { AuthProvider } from "../../../../sharedModule/services/auth/auth";

/**
 * Container component for stockbroking summary
 * This component handles all redux related activities pertaining to stockbroking summary
 *
 * @type Container/Smart component
 * @export
 * @class StbSummaryContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-summary-container",
  templateUrl: "stb-summary-container.html"
})
export class StbSummaryContainerPage {
  public activePortfolio: IPortfolio;
  public activePortfolioStockData: any;
  public activePortfolioStockGraphData: any;
  public activePortfolioBondData: any;
  public activePortfolioBondGraphData: any;
  public user: IUserState;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    private chartsProvider: ChartsProvider,
    private authProvider: AuthProvider,
    private authActionDispatcher: AuthActionDispatcher
  ) {
    this.activePortfolio = {} as any;
  }

  ionViewDidLoad() {
    this.getUserState();

    // Subscribe to the active portfolio
    this.store.select(selectors.getActivePortfolio).subscribe(portfolio => {
      this.activePortfolio = portfolio;
    });

    // Subscribe to the stock holdings for the active portfolio
    this.store
      .select(selectors.getActivePortfolioStockHoldings)
      .subscribe(stockData => {
        this.activePortfolioStockData = stockData;
      });

    // Subscribe to the stockHoldings graph data for the active portfolio, and get the exact object needed to plot a graph with this data
    this.store
      .select(selectors.getActivePortfolioStockHoldingsGraphData)
      .subscribe(stockGraphData => {
        this.activePortfolioStockGraphData = this.chartsProvider.getCspDefinedBarChart(
          stockGraphData
        );
      });

    // Subscribe to the bond holdings for the active portfolio
    this.store
      .select(selectors.getActivePortfolioBondHoldings)
      .subscribe(bondData => {
        this.activePortfolioBondData = bondData;
      });

    // Subscribe to the bondHoldings graph data for the active portfolio, and get the exact object needed to plot a graph with this data
    this.store
      .select(selectors.getActivePortfolioBondHoldingsGraphData)
      .subscribe(bondGraphData => {
        this.activePortfolioBondGraphData = this.chartsProvider.getCspDefinedBarChart(
          bondGraphData
        );
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
