import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/skip";

import {
  AuthActionDispatcher,
  userIsAuthenticating,
  userIsAuthenticated,
  numberOfFailedAuthAttempts
} from "../../../store";
import { IAppState } from "../../../store/models";
import * as PAGES from "../../../sharedModule/pages.constants";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";

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
  public failedAuthAttempt$: Observable<number>;
  private loginLoader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public authActionDispatcher: AuthActionDispatcher,
    public utilityProvider: UtilityProvider,
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
    // Skip the first one, so we dont show an error on 0 failed auth attempts (the default state)
    this.failedAuthAttempt$ = this.store
      .select(numberOfFailedAuthAttempts)
      .skip(1);

    // Subscribe to the isAuthenticating state and display the login loader based on its status
    this.isAuthenticating$.subscribe(status => {
      if (status) {
        this.presentLoginLoader();
      } else {
        // Only attempt to dismiss the loader if it is already visible
        if (this.loginLoader) {
          this.loginLoader.dismiss();
        }
      }
    });

    // Subscribe to the isAuthenticated state and navigate based on its state
    this.isAuthenticated$.subscribe(status => {
      if (status) {
        this.goToWelcomePage();
      }
    });

    // Subscribe to the failedAuthAttempts auth state, and show a toast everytime there is a failed login
    this.failedAuthAttempt$.subscribe(failedAttempt => {
      if (failedAttempt > 0) {
        this.utilityProvider.presentToast("Invalid credentials", "toastError");
      }
    });
  }

  /**
   * Create the login loader to be presented when the user is logging in
   *
   * @memberof LoginPage
   */
  presentLoginLoader(): void {
    this.loginLoader = this.loadingCtrl.create({
      content: "Logging in..."
    });

    this.loginLoader.present();
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
    this.navCtrl.push(PAGES.HOME_PAGE);
  }

  /**
   * Navigate to the welcome page
   *
   * @returns {*}
   * @memberof LoginPage
   */
  goToWelcomePage(): any {
    this.navCtrl.push(PAGES.WELCOME_PAGE);
  }

  /**
   * Display the error toast when authentication fails
   *
   * @param {string} [errorMessage="Authentication failed"]
   * @memberof LoginPage
   */
  showAuthErrorToast(errorMessage: string = "Authentication failed") {
    let toast = this.toastCtrl.create({
      message: errorMessage,
      duration: 3000,
      position: "top"
    });

    toast.present();
  }
}
