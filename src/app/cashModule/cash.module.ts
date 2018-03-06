import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { SharedModule } from "../sharedModule/shared.module";

import { CashAccountViewComponent } from "./pages/cash-account-view/cash-account-view";

/**
 * The CashModule contains all Cash related services, components and directives that could be required by various other modules(including ionic page modules) in the application
 *
 * @export
 * @class StockbrokingModule
 */
@NgModule({
  imports: [IonicModule, CommonModule, SharedModule],
  declarations: [CashAccountViewComponent],
  exports: [CashAccountViewComponent]
})
export class CashModule {
  /**
   * ModuleWithProviders is used to ensure that only one instance of the services in this module is available to the entire application regardless of whether the feature module is eager or lazy loaded.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof CashModule
   */
  //   static forRoot(): ModuleWithProviders {
  //     return {
  //       ngModule: StockbrokingModule,
  //       providers: [
  //       ]
  //     };
  //   }
}
