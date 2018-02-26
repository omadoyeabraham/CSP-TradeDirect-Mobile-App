import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { StbSummaryComponent } from "./pages/summary/stb-summary/stb-summary";
import { SharedModule } from "../sharedModule/shared.module";
import { SwitchPortfolioComponent } from "./components/switch-portfolio/switch-portfolio";
import { StbHoldingsPerformanceChartsComponent } from "./pages/summary/stb-holdings-performance-charts/stb-holdings-performance-charts";
import { ChartsProvider } from "./providers/charts/charts";
import { PortfolioHoldingsComponent } from "./pages/holdings/portfolio-holdings/portfolio-holdings";
import { TradeOverviewComponent } from "./pages/trade/trade-overview/trade-overview";
import { SecuritiesActionsDispatcher } from "../store/actions/stockbroking/securities.actions";
import { SelectedPageActionsDispatcher } from "../store";
import { StbTradeHistoryComponent } from "./pages/history/stb-trade-history/stb-trade-history";

/**
 * The StockbrokingModule contains all STB services, components and directives that could be required by various other modules(including ionic page modules) in the application
 *
 * @export
 * @class StockbrokingModule
 */
@NgModule({
  imports: [IonicModule, CommonModule, SharedModule],
  declarations: [
    StbSummaryComponent,
    SwitchPortfolioComponent,
    StbHoldingsPerformanceChartsComponent,
    PortfolioHoldingsComponent,
    TradeOverviewComponent,
    StbTradeHistoryComponent
  ],
  exports: [
    StbSummaryComponent,
    SwitchPortfolioComponent,
    StbHoldingsPerformanceChartsComponent,
    PortfolioHoldingsComponent,
    TradeOverviewComponent,
    StbTradeHistoryComponent
  ]
})
export class StockbrokingModule {
  /**
   * ModuleWithProviders is used to ensure that only one instance of the services in this module is available to the entire application regardless of whether the feature module is eager or lazy loaded.
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof StockbrokingModule
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StockbrokingModule,
      providers: [
        ChartsProvider,
        SecuritiesActionsDispatcher,
        SelectedPageActionsDispatcher
      ]
    };
  }
}
