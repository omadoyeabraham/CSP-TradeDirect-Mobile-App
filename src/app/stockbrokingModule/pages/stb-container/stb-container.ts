import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Tabs } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";
import { IAppState, IUserState } from "../../../store/models";
import { Store } from "@ngrx/store";
import {
  getSelectedPage,
  getUserState,
  AuthActionDispatcher,
  getActivePortfolio
} from "../../../store";
import { setInterval } from "timers";
import { AuthProvider } from "../../../sharedModule/services/auth/auth";
import { IPortfolio } from "../../models";

let updateUserData;

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
  WatchlistPage: any;

  public hideSwitchPortfolio: boolean = false;
  public tabTitle: string = "Stockbroking";
  public showHeader: boolean = true;
  public refreshUserData: any;
  public user: IUserState;
  static userDataUpdateInterval: number = 15000;

  @ViewChild("stbTabs") stbTabs: Tabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public authProvider: AuthProvider,
    public authActionDispatcher: AuthActionDispatcher
  ) {
    // The various components are lazy-loaded by ionic using strings. This improves the app's intial load performance.
    this.StbSummaryContainerPage = PAGES.STB_SUMMARY_CONTAINER_PAGE;
    this.StbPortfolioHoldingsContainerPage =
      PAGES.STB_PORTFOLIO_HOLDINGS_CONTAINER_PAGE;
    this.StbTradeContainerPage = PAGES.STB_TRADE_CONTAINER_PAGE;
    this.StbTradeHistoryContainerPage = PAGES.STB_TRADE_HISTORY_CONTAINER_PAGE;
    this.WatchlistPage = PAGES.WATCHLIST_PAGE;
  }

  ionViewWillEnter() {
    this.getUserState();

    /**
     * Setup the interval (15 seconds) that intermittently updates the user's data.
     * This includes stb, FI, sma and cash data. The authActionDispatcher (called after
     * )
     */
    this.refreshUserData = setInterval(() => {
      this.updateUserData();
    }, StbContainerPage.userDataUpdateInterval);
  }

  ionViewWillLeave() {
    if (this.refreshUserData) {
      clearInterval(this.refreshUserData._id);
      this.refreshUserData = null;
    }
  }

  ionViewDidLoad() {
    this.store.select(getSelectedPage).subscribe((selectedPage: any) => {
      if (!selectedPage.showHeader) {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    });

    this.getUserState();
  }

  /**
   * Make the api call to get a customer's data and pass on control to the action dispatcher
   * class which dispatches the necessary actions to store the new data in the store.
   *
   * @memberof StbContainerPage
   */
  updateUserData() {
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
      },
      err => {
        console.log(err);
      }
    );
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

  getUserState() {
    this.store
      .select(getUserState)
      .subscribe(userState => (this.user = userState));
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
