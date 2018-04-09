import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { normalizeURL } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public logoUrl = "";
  private _logoUrl = "/assets/imgs/home/logo.png";
  constructor(public navCtrl: NavController) {
    this.logoUrl = normalizeURL(this._logoUrl);
  }

  // normalize(url: string): string {
  //   const normalizedUrl = normalizeURL(url);
  //   return normalizedUrl;
  // }

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
