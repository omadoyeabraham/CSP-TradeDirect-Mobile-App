import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { StbSummaryComponent } from "./pages/summary/stb-summary/stb-summary";
import { SharedModule } from "../sharedModule/shared.module";
import { SwitchPortfolioComponent } from "./components/switch-portfolio/switch-portfolio";

/**
 * The StockbrokingModule contains all STB services, components and directives that could be required by various other modules(including ionic page modules) in the application
 *
 * @export
 * @class StockbrokingModule
 */
@NgModule({
  imports: [IonicModule, CommonModule, SharedModule],
  declarations: [StbSummaryComponent, SwitchPortfolioComponent],
  exports: [StbSummaryComponent, SwitchPortfolioComponent]
})
export class StockbrokingModule {
  /**
   * ModuleWithProviders is used to ensure that only one instance of the services in this module is available to the entire application regardless of whether the feature module is eager or lazy loaded.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof StockbrokingModule
   */
  //   static forRoot(): ModuleWithProviders {
  //     return {
  //       ngModule: StockbrokingModule,
  //       providers: []
  //     };
  //   }
}
