import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import * as PAGES from "./sharedModule/pages.constants";
import * as authActions from "../../src/app/store/actions/auth/auth.actions";
import { IAppState } from "./store/models";
import { Store } from "@ngrx/store";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = PAGES.HOME_PAGE;
  pages: Array<{ title: string; pageName: any; icon: string }> = [
    { title: "Dashboard", pageName: PAGES.DASHBOARD_PAGE, icon: "home" },
    {
      title: "Stockbroking",
      pageName: PAGES.STB_CONTAINER_PAGE,
      icon: "folder-open"
    },
    {
      title: "Fixed Income",
      pageName: PAGES.FIXED_INCOME_CONTAINER_PAGE,
      icon: "briefcase"
    },
    {
      title: "FX Investments",
      pageName: PAGES.FX_INVESTMENTS_CONTAINER_PAGE,
      icon: "cash"
    }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public store: Store<IAppState>
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Navigate to the selected page
   *
   * @param {any} page
   * @memberof MyApp
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.pageName);
  }

  isActive(page) {}

  /**
   * Logout the user, and dispatch the action to clear the local store
   *
   * @memberof MyApp
   */
  logout() {
    this.store.dispatch(new authActions.Logout());

    // Navigate back to the homepage, after logging out
    setTimeout(() => {
      this.nav.setRoot(PAGES.HOME_PAGE);
    }, 500);
  }
}
