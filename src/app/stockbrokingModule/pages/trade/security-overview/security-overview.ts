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
  getUniquePortfolioHoldingNames,
  getMarketData
} from "../../../../store";
import { ISecurity } from "../../../models";
import { ChartsProvider } from "../../../providers/charts/charts";
import * as pages from "../../../../sharedModule/pages.constants";
import { SecuritiesActionsDispatcher } from "../../../../store/actions/stockbroking/securities.actions";
import { SecuritiesProvider } from "../../../../sharedModule/services/securities/securities";

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
  public uniquePortfolioHoldings: Array<string>;
  public shouldSell: boolean = false;
  public marketSecurities: Array<ISecurity>;
  public refreshSecurityMarketData: any;
  static updateSecurityMarketDataInterval: number = 5000;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public chartsProvider: ChartsProvider,
    public selectedPageActionDispatcher: SelectedPageActionsDispatcher,
    public securitiesActionsDispatcher: SecuritiesActionsDispatcher,
    public securitiesProvider: SecuritiesProvider
  ) {}

  goBack() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.getSelectedSecurity();

    /**
     * Setup the interval (5 seconds) that intermittently updates the market data for the selected security
     * )
     */
    this.refreshSecurityMarketData = setInterval(() => {
      this.updateSelectedSecurityMarketData();
    }, SecurityOverviewPage.updateSecurityMarketDataInterval);
  }

  ionViewWillLeave() {
    /**
     * Clear the setInterval call used to periodically update the selected securities market data
     * before leaving this page
     */
    if (this.refreshSecurityMarketData) {
      clearInterval(this.refreshSecurityMarketData);
      this.refreshSecurityMarketData = null;
    }
  }

  ionViewDidLoad() {
    this.selectedPageActionDispatcher.setSelectedPageData({
      showHeader: false
    });

    this.getSelectedSecurity();

    // Subscribe to store and get marketdata for the selected security
    this.store
      .select(getSelectedSecurityMarketData)
      .subscribe(marketdata => (this.securityMarketData = marketdata));

    // Select the securities with market data from the store
    this.store
      .select(getMarketData)
      .subscribe(marketData => (this.marketSecurities = marketData));

    // Subscribe to store and get data for graph plotting
    this.store
      .select(getSelectedSecurityPriceMovements)
      .subscribe(graphData => {
        if (graphData) {
          this.securityGraphData = this.chartsProvider.getCspDefinedPriceMovementChart(
            graphData
          );
          setTimeout(() => {
            const chartDiv = document.querySelector("#priceMovementGraph");
            if (chartDiv) {
              Highcharts.chart("priceMovementGraph", this.securityGraphData);
            }
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
    this.store
      .select(getUniquePortfolioHoldingNames)
      .subscribe(uniqueHoldingNames => {
        this.uniquePortfolioHoldings = uniqueHoldingNames;
        let shouldSell = this.uniquePortfolioHoldings.find(
          holdingName => holdingName === this.security.name
        );
        if (shouldSell) {
          this.shouldSell = true;
        } else {
          this.shouldSell = false;
        }
      });
  }

  /**
   * Get the security selected, and currently being overviewed
   *
   * @memberof SecurityOverviewPage
   */
  getSelectedSecurity() {
    this.store
      .select(getSelectedSecurityOnOverviewPage)
      .subscribe(security => (this.security = security));
  }

  /**
   * Get updated data for the security selected on this page
   *
   * @memberof SecurityOverviewPage
   */
  updateSelectedSecurityMarketData() {
    console.log("Called");
    this.securitiesProvider
      .getSelectedSecurityMarketData(this.security.name)
      .subscribe(
        response => {
          this.securitiesActionsDispatcher.saveSelectedSecurityOnOverviewPageMarketDataToStore(
            response
          );
        },
        err => {
          console.log(err);
        }
      );

    // .pipe(
    //   switchMap(securityMarketData => [
    //     new securityActions.saveSelectedSecurityOnOverviewPageMarketDataToStore(
    //       securityMarketData
    //     )
    //   ])
    // );
  }

  /**
   * Navigate to the mandate page, passing in an orderType and securityName if appropriate
   *
   * @param {string} [orderType=null]
   * @param {string} [securityName=null]
   * @memberof SecurityOverviewPage
   */
  goToMandatePage(orderType: string = null, securityName: string = null) {
    const selectedSecurity = this.marketSecurities.filter(
      sec => sec.name === securityName
    )[0];

    this.securitiesActionsDispatcher.setSelectedSecurityOnOverviewPage(
      selectedSecurity
    );
    this.navCtrl.push(pages.STB_PLACE_MANDATE_PAGE, {
      securityName,
      orderType
    });
  }
}
