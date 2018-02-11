import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";

/**
 * Container Page for all STB related pages in the application
 * This page displays tabs of various other container pages for the various sub-pages for stockbroking
 *
 * @type Container / Smart page
 * @export
 * @class StbContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-container",
  templateUrl: "stb-container.html"
})
export class StbContainerPage {
  StbSummaryContainerPage: any;
  StbPortfolioHoldingsContainerPage: any;
  StbTradeContainerPage: any;
  StbTradeHistoryContainerPage: any;
  StbWatchlistContainerPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // The various components are lazy-loaded by ionic using strings. This improves the app's intial load performance.
    this.StbSummaryContainerPage = PAGES.STB_SUMMARY_CONTAINER_PAGE;
    this.StbPortfolioHoldingsContainerPage =
      PAGES.STB_PORTFOLIO_HOLDINGS_CONTAINER_PAGE;
    this.StbTradeContainerPage = PAGES.STB_TRADE_CONTAINER_PAGE;
    this.StbTradeHistoryContainerPage = PAGES.STB_TRADE_HISTORY_CONTAINER_PAGE;
    this.StbWatchlistContainerPage = PAGES.STB_WATCHLIST_CONTAINER_PAGE;
  }

  ionViewDidLoad() {}
}
