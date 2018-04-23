import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import * as PAGES from "./sharedModule/pages.constants";
import * as authActions from "../../src/app/store/actions/auth/auth.actions";
import { IAppState } from "./store/models";
import { Store } from "@ngrx/store";
import { getStbPortfolios } from "./store";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = PAGES.HOME_PAGE;

  nairaPages: Array<{ title: string; pageName: any; icon: string }> = [
    { title: "Dashboard", pageName: PAGES.DASHBOARD_PAGE, icon: "home" },
    {
      title: "Stockbroking",
      pageName: PAGES.STB_CONTAINER_PAGE,
      icon: "stats"
    },
    {
      title: "Fixed Income",
      pageName: PAGES.FIXED_INCOME_CONTAINER_PAGE,
      icon: "briefcase"
    },
    {
      title: "Separately Managed Account",
      pageName: PAGES.SMA_PAGE,
      icon: "person"
    },
    {
      title: "Cash Account - Naira",
      pageName: PAGES.NAIRA_CASH_PAGE,
      icon: "cash"
    }
  ];

  fxPages: Array<{ title: string; pageName: any; icon: string }> = [
    {
      title: "FX Investments",
      pageName: PAGES.FX_INVESTMENTS_CONTAINER_PAGE,
      icon: "folder-open"
    },
    {
      title: "Cash Account - Dollar",
      pageName: PAGES.DOLLAR_CASH_PAGE,
      icon: "cash"
    }
  ];

  accountActionPages: Array<{ title: string; pageName: any; icon: string }> = [
    // {
    //   title: "Fund My Account",
    //   pageName: PAGES.FX_INVESTMENTS_CONTAINER_PAGE,
    //   icon: "add-circle"
    // },
    {
      title: "Change Password",
      pageName: PAGES.CHANGE_PASSWORD_PAGE,
      icon: "unlock"
    },
    {
      title: "Contact Account Manager",
      pageName: PAGES.CONTACT_MANAGER_PAGE,
      icon: "contacts"
    }
  ];

  public userHasStb: boolean = true;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public store: Store<IAppState>
  ) {
    this.initializeApp();

    this.store.select(getStbPortfolios).subscribe(portfolios => {
      if (portfolios.length === 0) {
        this.userHasStb = false;
      } else {
        this.userHasStb = true;
      }
    });
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

    // Do not navigate to the stockbroking page for users without STB accounts
    if (page.pageName === PAGES.STB_CONTAINER_PAGE && !this.userHasStb) {
      return;
    }
    this.nav.setRoot(page.pageName);
  }

  isActive(page) {}

  /**
   * Logout the user, and dispatch the action to clear the local store
   *
   * @memberof MyApp
   */
  logout() {
    try {
      this.store.dispatch(new authActions.Logout());
    } catch (e) {}
    // Navigate back to the homepage, after logging out
    setTimeout(() => {
      this.nav.setRoot(PAGES.HOME_PAGE);
    }, 500);
  }
}
