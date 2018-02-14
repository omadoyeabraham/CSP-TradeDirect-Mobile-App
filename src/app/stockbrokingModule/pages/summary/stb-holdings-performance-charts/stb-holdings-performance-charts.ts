import { Component, Input } from "@angular/core";

import * as Highcharts from "highcharts";

/**
 * Component which displays the graphs for stock and bond allocations
 *
 * @type Presentational component
 * @export
 * @class StbHoldingsPerformanceChartsComponent
 */
@Component({
  selector: "csmobile-stb-holdings-performance-charts",
  templateUrl: "stb-holdings-performance-charts.html"
})
export class StbHoldingsPerformanceChartsComponent {
  // Default chart type shown on component load
  public chartType: string = "stockPerformance";

  @Input("stockData") stockData: any;
  @Input("stockGraphData") stockGraphData: any;

  constructor() {}

  /**
   * Determine whether or not to hide the stock performance chart based on what segment is selected
   * This method was used because of the clash btw ionic's segment and highcharts (where charts become
   * invisible after segments are toggled)
   *
   * @return boolean
   */
  hideStockPerformanceChart() {
    return this.chartType === "bondPerformance";
  }

  /**
   * Determine whether or not to hide the bond performance chart based on what segment is selected
   * This method was used because of the clash btw ionic's segment and highcharts (where charts become
   * invisible after segments are toggled)
   *
   * @return boolean
   */
  hideBondPerformanceChart() {
    return this.chartType === "stockPerformance";
  }
}
