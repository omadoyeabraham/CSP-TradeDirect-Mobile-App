import { Component } from "@angular/core";

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
  selector: "cash-account-view",
  templateUrl: "cash-account-view.html"
})
export class CashAccountViewComponent {
  text: string;

  constructor() {
    console.log("Hello CashAccountViewComponent Component");
    this.text = "Hello World";
  }
}
