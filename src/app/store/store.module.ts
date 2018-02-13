import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  AuthActionDispatcher,
  UserActionDispatcher,
  ErrorActionDispatcher,
  StbPortfolioActionDispatcher
} from "./index";
import { SharedModule } from "../sharedModule/shared.module";

/**
 * Angular module created for the purposing of injecting the services created in the ngrx store into angular's dependency injection framework
 *
 * @export
 * @class CspStoreModule
 */
@NgModule({
  imports: [CommonModule, SharedModule]
})
export class CspStoreModule {
  /**
   * ModuleWithProviders is used to ensure that only one instance of the services in this module is available to the entire application regardless of whether the feature module is eager or lazy loaded.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof CspStoreModule
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CspStoreModule,
      providers: [
        AuthActionDispatcher,
        UserActionDispatcher,
        ErrorActionDispatcher,
        StbPortfolioActionDispatcher
      ]
    };
  }
}
