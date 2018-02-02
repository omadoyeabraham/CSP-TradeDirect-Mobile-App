import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {} from "@angular/forms";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
  // Class variables
  private loginForm: FormGroup;
  private username: FormControl;
  private password: FormControl;
  private loginInvalidated: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Create form controls as local page variables. This helps shorten the syntax for error checking in the template
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);

    // Create the login form
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ionViewDidLoad() {}

  /**
   * Login the user
   *
   * @memberof LoginPage
   */
  login() {
    // Ensure that the username and password are provided before attempting to login
    if (!this.loginForm.valid) {
      return;
    }

    alert("attempting login");
  }

  /**
   * Close the Login Modal page
   */
  closeLoginPage(): void {
    this.navCtrl.pop();
  }
}
