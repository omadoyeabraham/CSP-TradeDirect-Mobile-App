import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Tabs } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";
import { SecurityOverviewPage } from "../trade/security-overview/security-overview";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import { getSelectedPage } from "../../../store";

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

  public hideSwitchPortfolio: boolean = false;
  public tabTitle: string = "Stockbroking";
  public showHeader: boolean = true;

  @ViewChild("stbTabs") stbTabs: Tabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {
    // The various components are lazy-loaded by ionic using strings. This improves the app's intial load performance.
    this.StbSummaryContainerPage = PAGES.STB_SUMMARY_CONTAINER_PAGE;
    this.StbPortfolioHoldingsContainerPage =
      PAGES.STB_PORTFOLIO_HOLDINGS_CONTAINER_PAGE;
    this.StbTradeContainerPage = PAGES.STB_TRADE_CONTAINER_PAGE;
    this.StbTradeHistoryContainerPage = PAGES.STB_TRADE_HISTORY_CONTAINER_PAGE;
    this.StbWatchlistContainerPage = PAGES.STB_WATCHLIST_CONTAINER_PAGE;
  }

  ionViewDidLoad() {
    // this.store.select(getSelectedPage).subscribe((selectedPage: any) => {
    //   if (selectedPage.name === PAGES.STB_SECURITY_OVERVIEW_PAGE) {
    //     this.showHeader = false;
    //   } else {
    //     this.showHeader = true;
    //   }
    //   console.log("HeaderName ", this.showHeader, selectedPage.name);
    // });
    // this.navCtrl.viewDidEnter.subscribe(view => {
    //   console.log(view.instance.constructor.name);
    // });
  }

  /**
   * Handles the ionSelected event emitted by the stbTabs when a new tab is selected
   *
   * @memberof StbContainerPage
   */
  onTabChange() {
    this.hideSwitchPortfolioComponent();
    this.setTabTitle();
  }

  /**
   * Determine based on the tab currently selected on the stb page whether to hide the switch portfolio component or not.
   *
   * @memberof StbContainerPage
   */
  hideSwitchPortfolioComponent() {
    // const summaryTab = this.stbTabs._tabs[0];
    // const holdingsTab = this.stbTabs._tabs[1];
    const tradeTab = this.stbTabs._tabs[2];
    // const historyTab = this.stbTabs._tabs[3];
    const watchlistTab = this.stbTabs._tabs[4];

    // Hide the switch portfolio component on the watchlist page
    if (watchlistTab.isSelected || tradeTab.isSelected) {
      this.hideSwitchPortfolio = true;
    } else {
      this.hideSwitchPortfolio = false;
    }
  }

  /**
   * Set the tabTitle to be displayed on the stbPageHeader based on the currently active tab
   *
   * @memberof StbContainerPage
   */
  setTabTitle() {
    // Set the tabTitle to be displayed based on the selected page
    this.stbTabs._tabs.forEach(tab => {
      if (tab.isSelected) {
        this.tabTitle = tab.tabTitle;
      }
    });
  }
}
