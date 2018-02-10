import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import {
  AuthActionDispatcher,
  userIsAuthenticating,
  userIsAuthenticated
} from "../../../store";
import { IAppState } from "../../../store/models";
import * as PAGES from "../../../sharedModule/pages.constants";

/**
 * Login page for the mobile application
 *
 * @export
 * @class LoginPage
 */
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  private loginForm: FormGroup;
  private username: FormControl;
  private password: FormControl;
  private isAuthenticating$: Observable<boolean>;
  public isAuthenticated$: Observable<boolean>;
  private loginLoader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public authActionDispatcher: AuthActionDispatcher,
    private store: Store<IAppState>
  ) {
    // Create form controls as local page variables. This helps shorten the syntax for error checking in the template
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);

    // Create the login form
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ionViewDidLoad() {
    // Get the isAuthenticating state from the store
    this.isAuthenticating$ = this.store.select(userIsAuthenticating);
    this.isAuthenticated$ = this.store.select(userIsAuthenticated);

    // Create the loader to be displayed when logging into the application.
    this.createLoginLoader();

    // Subscribe to the isAuthenticating state and display the login loader based on its status
    this.isAuthenticating$.subscribe(status => {
      if (status) {
        this.loginLoader.present();
      } else {
        // Only attempt to dismiss the loader if it is already visible
        this.loginLoader.present().then(() => {
          this.loginLoader.dismiss();
        });
      }
    });

    // Subscribe to the isAuthenticated state and navigate based on its state
    this.isAuthenticated$.subscribe(status => {
      if (status) {
        this.goToWelcomePage();
      }
    });
  }

  /**
   * Create the login loader to be presented when the user is logging in
   *
   * @memberof LoginPage
   */
  createLoginLoader(): void {
    this.loginLoader = this.loadingCtrl.create({
      content: "Logging in..."
    });
  }

  /**
   * Login the user
   *
   * @memberof LoginPage
   */
  login() {
    // Ensure that the username and password are provided before attempting to login
    if (!this.loginForm.valid) {
      return;
    } else {
      // The form is valid, so dispatch the login action
      const credentials = {
        username: this.username.value,
        password: this.password.value
      };

      this.authActionDispatcher.loginUser(credentials);
    }
  }

  /**
   * Close the Login Modal page
   */
  closeLoginPage(): void {
    this.navCtrl.pop();
  }

  /**
   *
   *
   * @returns {*}
   * @memberof LoginPage
   */
  goToWelcomePage(): any {
    this.navCtrl.push(PAGES.WELCOME_PAGE);
  }
}
