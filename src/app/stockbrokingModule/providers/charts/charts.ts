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

  getCspDefinedPieChart(chartData: Array<any> = []) {
    const pieChartData = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      credits: {
        enabled: false
      },
      legend: {
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: {
          fontWeight: "normal"
        }
      },
      title: {
        text: ""
      },
      tooltip: {
        pointFormat: "<b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          size: "100%",
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
            formatter: function() {
              return Math.round(this.percentage * 100) / 100 + " %";
            },
            distance: -40,
            rotation: 10
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: "ASSET ALLOCATION",
          colorByPoint: true,
          data: chartData
        }
      ]
    };

    return pieChartData;
  }

  /**
   *  Return the configuration, styling and data necessary to draw a CSP specific price movement chart
   *
   * @param {Array<object>} [data=[]]
   * @memberof ChartsProvider
   */
  getCspDefinedPriceMovementChart(data: Array<any> = []) {
    const dates = [];
    const values = [];

    // Loop through state data and properly format the dates and values
    data.forEach(dayData => {
      // Remove the timestamp from the date returned
      // const date = dayData.createdDttm.split(' ')[0]

      dates.push(dayData.date);
      values.push(parseFloat(dayData.price));
    });

    // Calculate the data point interval on the Y axis
    const maximumValue = Math.max(...values);
    const minimumValue = Math.min(...values);

    /**
     * Divide by 500 = (5*100) because we want (5+1) data points
     *                 /100 & *100 so we round up to the nearest 100 using Math.ceil
     */
    const yAxisInterval = ((maximumValue - minimumValue) / 3).toFixed(2);

    const chartData = {
      chart: { type: "area" },
      lineWidth: 1,
      title: { text: "" },
      xAxis: { categories: dates, labels: { enabled: false } },
      yAxis: {
        title: { text: "" },
        labels: {
          formatter: function() {
            return this.value
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        },
        min: minimumValue,
        max: maximumValue,
        tickInterval: yAxisInterval
      },
      series: [{ name: " ", data: values, showInLegend: false }],
      credits: { enabled: false },
      plotOptions: {
        area: {},
        series: {}
      }
    };

    return chartData;
  }
}
