import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../store/models";
import { ICashAccountInterface } from "../../models/cashAccount.interface";
import {
  getNairaCashAccounts,
  saveActiveNairaCashAccountToStore
} from "../../../store";

/**
 * Container component which retrieves naira cash data from the store and passed it to the cashAccountView
 * component for rendering.
 *
 * @type Container component
 * @export
 * @class NairaCashPage
 */
@IonicPage()
@Component({
  selector: "page-naira-cash",
  templateUrl: "naira-cash.html"
})
export class NairaCashPage {
  public nairaCashAccounts: Array<ICashAccountInterface> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    this.store.select(getNairaCashAccounts).subscribe(cashAccounts => {
      this.nairaCashAccounts = cashAccounts;
    });
  }

  /**
   * Called when the switch cash account component emits the cashAccountChanged event.
   * This method dispatches the appropriate action to the redux store when the selected
   * naira cash account is changed.
   *
   * @param {ICashAccountInterface} cashAccount
   * @memberof NairaCashPage
   */
  changeSelectedNairaCashAccount(cashAccount: ICashAccountInterface) {
    // Dispatch the action to save the active naira cash account to the store.
    this.store.dispatch(new saveActiveNairaCashAccountToStore(cashAccount));
  }
}
