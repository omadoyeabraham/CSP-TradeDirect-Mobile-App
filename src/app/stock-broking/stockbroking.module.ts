import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { StbSummaryComponent } from "./pages/summary/stb-summary/stb-summary";

/**
 * The StockbrokingModule contains all services, components and directives that could be required by various other modules in the application
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [StbSummaryComponent],
  exports: [StbSummaryComponent]
})
export class StockbrokingModule {
  /**
   * ModuleWithProviders is used to ensure that only one instance of the services in this module is available to the entire application regardless of whether the feature module is eager or lazy loaded.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof SharedModule
   */
  //   static forRoot(): ModuleWithProviders {
  //     return {
  //       ngModule: StockbrokingModule,
  //       providers: []
  //     };
  //   }
}
