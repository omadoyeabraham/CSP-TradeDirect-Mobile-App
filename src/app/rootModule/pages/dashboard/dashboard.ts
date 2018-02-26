import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";

/**
 *
 *
 * @export
 * @class DashboardPage
 */
@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  public stbPage: string = PAGES.STB_CONTAINER_PAGE;
  public fixedIncomePage: string = PAGES.FIXED_INCOME_CONTAINER_PAGE;
  public fxPage: string = PAGES.FX_INVESTMENTS_CONTAINER_PAGE;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  /**
   * Navigate to various pages using ionic's nav controller
   *
   * @param pageName String use by angular to lazyload the page component
   */
  goToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }
}
