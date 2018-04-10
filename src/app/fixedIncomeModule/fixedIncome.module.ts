import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { SharedModule } from "../sharedModule/shared.module";
import { FixedIncomeComponent } from "./pages/fixed-income/fixed-income";
import { FixedIncomeInvestmentsDisplayComponent } from "./pages/fixed-income-investments-display/fixed-income-investments-display";

/**
 * The FixedIncomeModule contains all FixedIncome services, components and directives that could be required by various other modules(including ionic page modules) in the application
 *
 * @export
 * @class FixedIncomeModule
 */
@NgModule({
  imports: [IonicModule, CommonModule, SharedModule],
  declarations: [FixedIncomeComponent, FixedIncomeInvestmentsDisplayComponent],
  exports: [FixedIncomeComponent, FixedIncomeInvestmentsDisplayComponent]
})
export class FixedIncomeModule {
  /**
   * ModuleWithProviders is used to ensure that only one instance of the services in this module is available to the entire application regardless of whether the feature module is eager or lazy loaded.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof FixedIncomeModule
   */
  //   static forRoot(): ModuleWithProviders {
  //     return { ngModule: FixedIncomeModule, providers: [] };
  //   }
}
