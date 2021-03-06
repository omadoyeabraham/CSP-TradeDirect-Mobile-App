import { Component, Input, OnInit } from "@angular/core";

/**
 * Presentational component which displays the summary for the active cash account selected by the user
 *
 * @type Presentational Component
 * @export
 * @class CashAccountSummaryComponent
 */
@Component({
  selector: "csmobile-cash-account-summary",
  templateUrl: "cash-account-summary.html"
})
export class CashAccountSummaryComponent implements OnInit {
  @Input("cashStatementSummary") cashStatementSummary;
  constructor() {}

  ngOnInit() {
    console.log(this.cashStatementSummary);
  }
}
