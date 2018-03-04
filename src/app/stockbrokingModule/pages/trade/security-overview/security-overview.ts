import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as Highcharts from "highcharts";

import { IAppState } from "../../../../store/models";
import { Store } from "@ngrx/store";
import {
  getSelectedSecurityOnOverviewPage,
  getSelectedSecurityMarketData,
  getSelectedSecurityPriceMovements,
  getSelectedSecurityBids,
  getSelectedSecurityOffers,
  SelectedPageActionsDispatcher,
  getUniquePortfolioHoldingNames
} from "../../../../store";
import { ISecurity } from "../../../models";
import { ChartsProvider } from "../../../providers/charts/charts";
import * as pages from "../../../../sharedModule/pages.constants";

/**
 * The page which shows the overview for the security selected on the trade overview page
 *
 * @type Presentational / Smart component
 * @export
 * @class SecurityOverviewPage
 */
@IonicPage()
@Component({
  selector: "csmobile-page-security-overview",
  templateUrl: "security-overview.html"
})
export class SecurityOverviewPage {
  public securityGraphData: any;
  public securityMarketData: Object;
  public security: ISecurity;
  public bids: Array<any> = [];
  public offers: Array<any> = [];
  public trades: Array<any> = [];
  public bidsOffersTrades: string = "bidsOffers";
  public uniquePortfolioHoldings: Array<string>
  public shouldSell: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public chartsProvider: ChartsProvider,
    public selectedPageActionDispatcher: SelectedPageActionsDispatcher
  ) { }

  goBack() {
    this.navCtrl.pop()
  }


  ionViewDidLoad() {
    this.selectedPageActionDispatcher.setSelectedPageData({
      showHeader: false
    });

    this.store
      .select(getSelectedSecurityOnOverviewPage)
      .subscribe(security => (this.security = security));

    // Subscribe to store and get marketdata for the selected security
    this.store
      .select(getSelectedSecurityMarketData)
      .subscribe(marketdata => (this.securityMarketData = marketdata));

    // Subscribe to store and get data for graph plotting
    this.store
      .select(getSelectedSecurityPriceMovements)
      .subscribe(graphData => {
        if (graphData) {
          this.securityGraphData = this.chartsProvider.getCspDefinedPriceMovementChart(
            graphData
          );
          setTimeout(() => {
            Highcharts.chart("priceMovementGraph", this.securityGraphData);
          }, 1000);

          // Get only 10 trades to be displayed
          // this.trades = graphData.filter((trade, index) => {
          //   return index <= 9;
          // });
          this.trades = graphData;
        } else {
          this.securityGraphData = null;
        }
      });

    // Subscribe to store and get bids
    this.store.select(getSelectedSecurityBids).subscribe(bids => {
      // Only select 10 bids to be displayed
      // this.bids = bids.filter((bid, index) => {
      //   return index <= 9;
      // });
      this.bids = bids;
    });

    // Subscribe to store and get offers
    this.store.select(getSelectedSecurityOffers).subscribe(offers => {
      // this.offers = offers.filter((offer, index) => {
      //   return index <= 9;
      // });
      this.offers = offers;
    });

    // Determine if the security is owned by the user
    this.store.select(getUniquePortfolioHoldingNames).subscribe(uniqueHoldingNames => {
      this.uniquePortfolioHoldings = uniqueHoldingNames;
      let shouldSell = this.uniquePortfolioHoldings.find(holdingName => holdingName === this.security.name)
      if (shouldSell) {
        this.shouldSell = true
      } else {
        this.shouldSell = false
      }
    })
  }

  /**
   * Navigate to the mandate page, passing in an orderType and securityName if appropriate
   *
   * @param {string} [orderType=null]
   * @param {string} [securityName=null]
   * @memberof SecurityOverviewPage
   */
  goToMandatePage(orderType: string = null, securityName: string = null) {
    this.navCtrl.push(pages.STB_PLACE_MANDATE_PAGE, {
      securityName,
      orderType
    });
  }
}
