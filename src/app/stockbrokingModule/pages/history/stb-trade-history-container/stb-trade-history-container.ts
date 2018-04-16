import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import {
  getActivePortfolioTradeOrders,
  getActivePortfolioOutstandingTradeOrders,
  TradeOrderActionsDispatcher,
  getUserState
} from "../../../../store";
import { TradeOrderProvider } from "../../../providers/trade-order/trade-order";

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
  public refreshTradeHistory: any;
  static tradeHistoryUpdateInterval: number = 15000;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public tradeOrderProvider: TradeOrderProvider,
    public tradeOrderDispatcher: TradeOrderActionsDispatcher
  ) {}

  ionViewWillEnter() {
    /**
     * Setup the interval (15 seconds) that intermittently updates the user's trade history
     */
    this.refreshTradeHistory = setInterval(() => {
      this.tradeOrderDispatcher.getTradeOrderHistory();
    }, StbTradeHistoryContainerPage.tradeHistoryUpdateInterval);
  }

  ionViewDidLoad() {
    // Subscribe to trade orders from the store
    this.store.select(getActivePortfolioTradeOrders).subscribe(tradeOrders => {
      this.tradeOrders = tradeOrders;
    });

    // Subscribe to outstanding trade orders from the store
    this.store
      .select(getActivePortfolioOutstandingTradeOrders)
      .subscribe(outstandingTradeOrders => {
        this.outstandingTradeOrders = outstandingTradeOrders;
      });
  }

  ionViewWillLeave() {
    if (this.refreshTradeHistory) {
      clearInterval(this.refreshTradeHistory._id);
      this.refreshTradeHistory = null;
    }
  }

  /**
   * Make the api call to update the user's trade history
   *
   * @returns
   * @memberof StbTradeHistoryContainerPage
   */
  getUpdatedTradeHistory() {
    let userID: number;

    // Get the userID from the store
    this.store.select(getUserState).subscribe(userData => {
      userID = userData.id;
    });

    return this.tradeOrderProvider.getTradeOrderHistory(userID);
  }

  /**
   * Refresh the list of trade orders displayed in the history component
   *
   * @param {any} refresher
   * @memberof StbTradeHistoryContainerPage
   */
  doRefresh(refresher) {
    // Get and save the user's updated trade order history to the store
    this.getUpdatedTradeHistory().subscribe(
      data => {
        const tradeOrders = data.item;
        this.tradeOrderDispatcher.saveTradeOrderHistoryInStore(tradeOrders);
        refresher.complete();
      },
      err => {
        console.log(err);
        refresher.cancel();
      }
    );
  }
}
