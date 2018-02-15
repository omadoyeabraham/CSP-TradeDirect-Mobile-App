import { Injectable } from "@angular/core";

/**
 * Service which provides specific data objects used to plot graphs, based on HighCharts stipulated data structure
 *
 * @export
 * @class ChartsProvider
 */
@Injectable()
export class ChartsProvider {
  constructor() {}

  /**
   *  Return the configuration, styling and data necessary to draw a CSP specific bar chart
   *
   * @param {Array<any>} [chartData=[]]
   * @memberof ChartsProvider
   */
  getCspDefinedBarChart(chartData: Array<any> = []) {
    // initialize variables
    let dataSet = chartData;
    let graphData = [{ data: [] }];
    let categories = [];
    let performanceColor = "";

    /**
     * Extra check for portfolios with no holdings
     */
    if (dataSet === null) {
      dataSet = [];
    }

    dataSet.forEach(data => {
      // Red for losses and green for gains
      performanceColor = data.percentageGain < 0 ? "#FF0000" : "#00FF00";

      // Format the data properly for display using highcharts column chart
      graphData[0].data.push({
        y: parseFloat(data.percentageGain),
        color: performanceColor
      });

      categories.push(data.name);
    });

    const chartObject = {
      chart: { type: "column", verticalAlign: "middle", height: 190 },
      title: { text: "" },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0"> </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true
      },
      xAxis: { categories: categories },
      legend: { enabled: false, align: "left" },
      yAxis: { title: { text: "( % )" } },
      credits: { enabled: false }, // series: graphData
      series: graphData
    };

    return chartObject;
  }
}
