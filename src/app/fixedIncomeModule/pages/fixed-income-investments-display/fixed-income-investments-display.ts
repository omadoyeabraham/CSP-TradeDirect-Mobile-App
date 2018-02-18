import { Component, Input } from "@angular/core";
import { IFixedIncomeInvestment } from "../../models";

/**
 * Presentational component which displays an array of fixedIncome investments passed into it
 * This component could be used to display running or terminated investments.
 *
 * @type Presentational
 * @export
 * @class FixedIncomeInvestmentsDisplayComponent
 */
@Component({
  selector: "csmobile-fixed-income-investments-display",
  templateUrl: "fixed-income-investments-display.html"
})
export class FixedIncomeInvestmentsDisplayComponent {
  // The type of fixedIncome investments being displayed by the component
  @Input("type") type: string = "";
  @Input("investments") investments: IFixedIncomeInvestment[];

  constructor() {}
}
