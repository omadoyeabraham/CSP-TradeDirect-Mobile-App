import { Component, Input } from "@angular/core";
import { IFixedIncomeInvestment } from "../../models";

/**
 * Component which uses ionic segments to display the components for running and terminated investments
 *
 * @type Presentational
 * @export
 * @class FixedIncomeComponent
 */
@Component({
  selector: "csmobile-fixed-income",
  templateUrl: "fixed-income.html"
})
export class FixedIncomeComponent {
  // Default investment type to be shown once the fixed income page is opened
  public investmentType = "runningInvestment";

  @Input("runningInvestments") runningInvestments: IFixedIncomeInvestment[];
  @Input("terminatedInvestments")
  terminatedInvestments: IFixedIncomeInvestment[];

  constructor() {}
}
