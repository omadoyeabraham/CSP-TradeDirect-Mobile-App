import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { Store } from "@ngrx/store";

import * as PAGES from "../../../sharedModule/pages.constants";
import * as authActions from "../../../store/actions/auth/auth.actions";
import { IAppState, IUserState } from "../../../store/models";
import { getUserState, AuthActionDispatcher } from "../../../store";

/**
 * Welcome page
 *
 * @export
 * @class WelcomePage
 */
@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  public user$: Store<IUserState>;
  public loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authActionDispatcher: AuthActionDispatcher,
    public store: Store<IAppState>,
    public loadingCtrl: LoadingController
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
    this.presentLoader();

    /**
     * The setTimeout is just a hack to ensure that background async calls have a bit of time
     * to finish up and load up the redux store before the user is granted access to the application
     */
    setTimeout(() => {
      this.dismissLoader();
      this.navCtrl.setRoot(PAGES.DASHBOARD_PAGE);
    }, 5000);
  }

  presentLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });

    this.loader.present();
  }

  dismissLoader() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }

  /**
   * Reset the authenticated state of the app, and go back to the login page
   *
   * @memberof WelcomePage
   */
  backToLoginPage() {
    this.authActionDispatcher.resetAuthState();
    this.store.dispatch(new authActions.Logout());
    this.navCtrl.push(PAGES.LOGIN_PAGE);
  }
}
