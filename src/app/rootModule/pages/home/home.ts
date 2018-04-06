import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  /**
   * Open the login modal page
   */
  openLoginModal() {
    this.navCtrl.push(PAGES.LOGIN_PAGE);
  }

  openForgotPasswordModal() {
    this.navCtrl.push(PAGES.FORGOT_PASSWORD_PAGE);
  }
}
