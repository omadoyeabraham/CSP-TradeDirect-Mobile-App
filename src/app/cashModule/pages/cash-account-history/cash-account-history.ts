import { Component } from "@angular/core";

/**
 * Generated class for the CashAccountHistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "csmobile-cash-account-history",
  templateUrl: "cash-account-history.html"
})
export class CashAccountHistoryComponent {
  text: string;

  constructor() {
    console.log("Hello CashAccountHistoryComponent Component");
    this.text = "Hello World";
  }
}
