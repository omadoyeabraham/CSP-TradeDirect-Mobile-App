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
  @Input("totalFixedIncomeValue") totalFixedIncomeValue: number;
  @Input("currency") currency: any = "₦";
  @Input("kind") kind: string;

  private lastToggledDiv: any;
  public totalInvestmentsValue: any = "---";

  constructor() {}

  /**
   * Used to toggle the visibility of an investment's details when it is clicked on
   */
  toggleInvestmentDisplay($event) {
    let investmentDiv = $event.srcElement;
    investmentDiv = investmentDiv.parentNode.parentNode.parentNode;

    // A div has been clicked on
    if (this.lastToggledDiv) {
      if (this.lastToggledDiv === investmentDiv) {
        this.lastToggledDiv.classList.toggle("showDetails");
      } else {
        this.lastToggledDiv.classList.remove("showDetails");
        investmentDiv.classList.toggle("showDetails");
      }
    } else {
      // No Div previously clicked on
      investmentDiv.classList.toggle("showDetails");
    }

    this.lastToggledDiv = investmentDiv;
  }
}
