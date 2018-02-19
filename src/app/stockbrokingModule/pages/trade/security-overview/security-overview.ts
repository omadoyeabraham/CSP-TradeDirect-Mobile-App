import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { IAppState } from "../../../../store/models";
import { Store } from "@ngrx/store";
import { getSelectedSecurityOnOverviewPage } from "../../../../store";
import { ISecurity } from "../../../models";

/**
 *
 *
 * @export
 * @class SecurityOverviewPage
 */
@IonicPage()
@Component({
  selector: "csmobile-page-security-overview",
  templateUrl: "security-overview.html"
})
export class SecurityOverviewPage {
  public security: ISecurity;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    this.store
      .select(getSelectedSecurityOnOverviewPage)
      .subscribe(security => (this.security = security));
  }
}
