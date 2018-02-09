import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Store } from "@ngrx/store";

import * as PAGES from "../../../sharedModule/pages.constants";
import { Observable } from "rxjs/Observable";
import { IUserState } from "../../../store/models";

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
  public customerLabel$: Observable<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public store: Store<IUserState>
  ) {}

  ionViewDidLoad() {
    // this.customerLabel$ = this.store.select()
  }

  continueToDashboard() {
    this.navCtrl.setRoot(PAGES.DASHBOARD_PAGE);
  }

  backToLoginPage() {
    this.viewController.dismiss();
  }
}
