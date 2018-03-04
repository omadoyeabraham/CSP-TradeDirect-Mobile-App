import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import {
  getActivePortfolioTradeOrders,
  getActivePortfolioOutstandingTradeOrders
} from "../../../../store";

/**
 * Container component for trade history
 *
 * @type Container/Smart component
 * @export
 * @class StbTradeHistoryContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-trade-history-container",
  templateUrl: "stb-trade-history-container.html"
})
export class StbTradeHistoryContainerPage {
  public tradeOrders: Array<any> = [];
  public outstandingTradeOrders: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) { }

  ionViewDidLoad() {
    // Subscribe to trade orders from the store
    this.store.select(getActivePortfolioTradeOrders).subscribe(tradeOrders => {
      this.tradeOrders = tradeOrders;
    });

    // Subscribe to outstanding trade orders from the store
    this.store
      .select(getActivePortfolioOutstandingTradeOrders)
      .subscribe(
        outstandingTradeOrders =>
          (this.outstandingTradeOrders = outstandingTradeOrders)
      );
  }
}
