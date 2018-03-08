import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Presentational component which displays the details for a transaction selected by the user
 *
 * @export
 * @class CashTransactionDetailsPage
 */
@IonicPage()
@Component({
  selector: "page-cash-transaction-details",
  templateUrl: "cash-transaction-details.html"
})
export class CashTransactionDetailsPage {
  public transaction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.transaction = this.navParams.get("transaction");
  }
}
