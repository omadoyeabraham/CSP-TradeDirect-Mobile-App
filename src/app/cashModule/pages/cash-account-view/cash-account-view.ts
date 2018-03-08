import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { CASH_TRANSACTION_DETAILS } from "../../../sharedModule/pages.constants";

/**
 * Presentational component which is used to display the details of a particular cash account, and its history.
 * This component is passed in @Inputs and @Outputs from its parent components (NairaCashPage or DollarCashPage) depending
 * on the what page the user is on
 *
 * @type Presentational
 * @export
 * @class CashAccountViewComponent
 */
@Component({
  selector: "csmobile-cash-account-view",
  templateUrl: "cash-account-view.html"
})
export class CashAccountViewComponent {
  constructor(public navCtrl: NavController) {}

  /**
   * Navigate to the transaction details page, which displays the details for a
   * particular transaction
   *
   * @param {*} [transaction=[]]
   * @memberof CashAccountViewComponent
   */
  goToTransactionDetailsPage(transaction: any = []) {
    this.navCtrl.push(CASH_TRANSACTION_DETAILS, {
      transaction
    });
  }
}
