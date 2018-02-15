import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";

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
export class StbHoldingsPerformanceChartsComponent
  implements OnInit, OnChanges {
  // Default chart type shown on component load
  public chartType: string = "stockPerformance";

  @Input("stockData") stockData: any;
  @Input("stockGraphData") stockGraphData: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Delay so that the component has time to get the data onload before it tries to render the graph
    setTimeout(() => {
      Highcharts.chart("stockPerformanceChart", this.stockGraphData);
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Watch the changes to the @Input and replot the graph whenever the data changes
    if (changes.stockGraphData.currentValue) {
      /**
       * Plot the graph if stock data exists, after 500ms. The time lag is so angular bindings showing/hiding the divs based on stockData will be done before the graph is plotted
       */
      if (this.stockData.length > 0) {
        setTimeout(() => {
          Highcharts.chart(
            "stockPerformanceChart",
            changes.stockGraphData.currentValue
          );
        }, 500);
      }
    }
  }

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
