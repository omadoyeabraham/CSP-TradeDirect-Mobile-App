import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthProvider } from "./services/auth/auth";
import { UtilityProvider } from "./services/utility/utility";
import { FormatNumberWithColorComponent } from "./components/format-number-with-color/format-number-with-color";
import { SecuritiesProvider } from "./services/securities/securities";
import { TradeOrderProvider } from "../stockbrokingModule/providers/trade-order/trade-order";
import { MarketDataProvider } from "../stockbrokingModule/providers/market-data/market-data";
import { CashProvider } from "../cashModule/provider/cash/cash";
import { WatchlistProvider } from "../stockbrokingModule/providers/watchlist/watchlist";

/**
 * The SharedModule contains all services, components and directives that could be required by various other modules in the application
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  imports: [CommonModule],
  declarations: [FormatNumberWithColorComponent],
  exports: [FormatNumberWithColorComponent]
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
      providers: [
        AuthProvider,
        UtilityProvider,
        SecuritiesProvider,
        TradeOrderProvider,
        MarketDataProvider,
        CashProvider,
        WatchlistProvider
      ]
    };
  }
}
