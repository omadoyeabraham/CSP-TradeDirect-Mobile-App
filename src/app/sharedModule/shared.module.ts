import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthProvider } from "./services/auth/auth";

/**
 * The SharedModule contains all services, components and directives that could be required by various other modules in the application
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: []
})
export class SharedModule {
  /**
   * ModuleWithProviders is used to ensure that only one instance of the services in this module is available to the entire application regardless of whether the feature module is eager or lazy loaded.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof SharedModule
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthProvider]
    };
  }
}
