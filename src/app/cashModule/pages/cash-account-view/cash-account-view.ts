import { Component, Output, EventEmitter, Input } from "@angular/core";
import { NavController } from "ionic-angular";
import { CASH_TRANSACTION_DETAILS } from "../../../sharedModule/pages.constants";
import { ICashStatement } from "../../models/cashStatement.interface";

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
  // Event emitter for filtering cash account statements
  @Output()
  filterCashAccountStatements = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>();

  @Input("cashStatements") cashStatements: Array<ICashStatement>;
  @Input("groupedCashStatements") groupedCashStatements: any;
  @Input("currency") currency: string = "₦";

  public startDate: string = "";
  public endDate: string = "";

  constructor(public navCtrl: NavController) {}

  /**
   * Called when the user tries to filter the list of cash statements currently being displayed
   *
   * @memberof CashAccountViewComponent
   */
  filterCashStatements() {
    this.filterCashAccountStatements.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

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
