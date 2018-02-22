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
  getSelectedSecurityOffers
} from "../../../../store";
import { ISecurity } from "../../../models";
import { ChartsProvider } from "../../../providers/charts/charts";

/**
 *
 *
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
  public bidsOffersTrades: string = "bids";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public chartsProvider: ChartsProvider
  ) {}

  ionViewDidLoad() {
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
          }, 500);

          // Get only 10 trades to be displayed
          this.trades = graphData.filter((trade, index) => {
            return index <= 9;
          });
        } else {
          this.securityGraphData = null;
        }
      });

    // Subscribe to store and get bids
    this.store.select(getSelectedSecurityBids).subscribe(bids => {
      // Only select 10 bids to be displayed
      this.bids = bids.filter((bid, index) => {
        return index <= 9;
      });
    });

    // Subscribe to store and get offers
    this.store.select(getSelectedSecurityOffers).subscribe(offers => {
      this.offers = offers.filter((offer, index) => {
        return index <= 9;
      });
    });
  }
}
