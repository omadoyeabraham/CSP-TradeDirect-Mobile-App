import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Store } from "@ngrx/store";

import * as PAGES from "../../../sharedModule/pages.constants";
import { IAppState, IUserState } from "../../../store/models";
import { getUserState, AuthActionDispatcher } from "../../../store";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  public user$: Store<IUserState>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authActionDispatcher: AuthActionDispatcher,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    this.user$ = this.store.select(getUserState);
  }

  /**
   * Navigate to the dashboard upon successful authentication
   *
   * @memberof WelcomePage
   */
  continueToDashboard() {
    this.navCtrl.setRoot(PAGES.DASHBOARD_PAGE);
  }

  /**
   * Reset the authenticated state of the app, and go back to the login page
   *
   * @memberof WelcomePage
   */
  backToLoginPage() {
    this.authActionDispatcher.loginUserFailed();
    this.navCtrl.push(PAGES.LOGIN_PAGE);
  }
}
