import { Component } from "@angular/core";

/**
 * Generated class for the FixedIncomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "csmobile-fixed-income",
  templateUrl: "fixed-income.html"
})
export class FixedIncomeComponent {
  // Default investment type to be shown once the fixed income page is opened
  public investmentType = "runningInvestment";

  constructor() {}
}
