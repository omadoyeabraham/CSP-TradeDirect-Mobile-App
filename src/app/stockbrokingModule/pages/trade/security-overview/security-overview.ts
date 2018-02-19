import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as Highcharts from "highcharts";

import { IAppState } from "../../../../store/models";
import { Store } from "@ngrx/store";
import {
  getSelectedSecurityOnOverviewPage,
  getSelectedSecurityMarketData,
  getSelectedSecurityGraphData
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
    this.store.select(getSelectedSecurityGraphData).subscribe(graphData => {
      if (graphData) {
        this.securityGraphData = this.chartsProvider.getCspDefinedPriceMovementChart(
          graphData
        );
        Highcharts.chart("priceMovementGraph", this.securityGraphData);
      } else {
        this.securityGraphData = null;
      }
    });
  }
}
