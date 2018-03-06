import { Component } from "@angular/core";

/**
 * Generated class for the CashAccountSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "csmobile-cash-account-summary",
  templateUrl: "cash-account-summary.html"
})
export class CashAccountSummaryComponent {
  text: string;

  constructor() {
    console.log("Hello CashAccountSummaryComponent Component");
    this.text = "Hello World";
  }
}
