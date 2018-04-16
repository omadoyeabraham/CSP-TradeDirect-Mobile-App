import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";
import * as Highcharts from "highcharts";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import {
  getTotalStockbrokingValue,
  getTotalValueOfFixedIncomeInvestments,
  totalNairaCashValue,
  totalDollarCashValue,
  getTotalValueOfFxInvestments,
  getStbPortfolios,
  getTotalSmaEquityValue,
  smaFiTotalValue,
  smaEquityTotalValue
} from "../../../store";
import { ChartsProvider } from "../../../stockbrokingModule/providers/charts/charts";

/**
 *
 *
 * @export
 * @class DashboardPage
 */
@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  public stbPage: string = PAGES.STB_CONTAINER_PAGE;
  public fixedIncomePage: string = PAGES.FIXED_INCOME_CONTAINER_PAGE;
  public fxPage: string = PAGES.FX_INVESTMENTS_CONTAINER_PAGE;
  public nairaCashPage: string = PAGES.NAIRA_CASH_PAGE;
  public dollarCashPage: string = PAGES.DOLLAR_CASH_PAGE;
  public smaPage: string = PAGES.SMA_PAGE;

  public totalStbValue = 0;
  public totalFiValue = 0;
  public totalSmaValue = 0;
  public totalSmaEquityValue = 0;
  public totalSmaFiValue = 0;
  public totalNairaCashValue = 0;
  public totalNairaValue = 0;
  public totalFxFiValue = 0;
  public totalFxCashValue = 0;
  public totalFxValue = 0;
  public chartData: any = {};

  public userHasStb: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public chartsProvider: ChartsProvider
  ) {}

  ionViewDidLoad() {
    this.store.select(getStbPortfolios).subscribe(portfolios => {
      if (portfolios.length === 0) {
        this.userHasStb = false;
      } else {
        this.userHasStb = true;
      }
    });

    // Get the total value of stockbroking investments
    this.store.select(getTotalStockbrokingValue).subscribe(totalStbValue => {
      this.totalStbValue = totalStbValue;
      this.updateTotalNairaValue();
    });

    // Get the total value of naira fixed income investments
    this.store
      .select(getTotalValueOfFixedIncomeInvestments)
      .subscribe(totalFiValue => {
        this.totalFiValue = totalFiValue;
        this.updateTotalNairaValue();
      });

    // Get the total value of sma equity investments
    this.store.select(smaEquityTotalValue).subscribe(totalSmaEquityValue => {
      this.totalSmaEquityValue = totalSmaEquityValue;
      this.updateTotalSmaValue();
    });

    // Get the total value for sma fixedincome investments
    this.store.select(smaFiTotalValue).subscribe(smaFiTotal => {
      this.totalSmaFiValue = smaFiTotal;
      this.updateTotalSmaValue();
    });

    // Get the total value of naira cash accounts
    this.store.select(totalNairaCashValue).subscribe(totalNairaCashValue => {
      this.totalNairaCashValue = totalNairaCashValue;
      this.updateTotalNairaValue();
    });

    // Total value of naira investments
    this.updateTotalNairaValue();

    // Get the total value of fx fi investments
    this.store.select(getTotalValueOfFxInvestments).subscribe(totalFxValue => {
      this.totalFxFiValue = totalFxValue;
      this.updateTotalDollarValue();
    });

    // Get the total value of fx cash
    this.store.select(totalDollarCashValue).subscribe(totalDollarCashValue => {
      this.totalFxCashValue = totalDollarCashValue;
      this.updateTotalDollarValue();
    });

    this.updateTotalDollarValue();
    this.updateTotalSmaValue();
  }

  ngAfterViewInit() {
    // Delay so that the component has time to get the data onload before it tries to render the graph
    setTimeout(() => {
      this.updateChartData();
      Highcharts.chart("accountOverview", this.chartData);
    }, 1000);
  }

  /**
   * Navigate to various pages using ionic's nav controller
   *
   * @param pageName String use by angular to lazyload the page component
   */
  goToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }

  /**
   * Called to update the total naira value after stb, fi, or cash values are updated
   * .
   * @memberof DashboardPage
   */
  updateTotalNairaValue() {
    this.totalNairaValue =
      this.totalFiValue +
      this.totalStbValue +
      this.totalNairaCashValue +
      this.totalSmaValue;
  }

  /**
   * Called to update the total dollar value after stb, fi, or cash values are updated
   * .
   * @memberof DashboardPage
   */
  updateTotalDollarValue() {
    this.totalFxValue = this.totalFxFiValue + this.totalFxCashValue;
  }

  /**
   * Called to update the total sma value, after sma equity and fixed income values are updated
   * .
   * @memberof DashboardPage
   */
  updateTotalSmaValue() {
    this.totalSmaValue = this.totalSmaEquityValue + this.totalSmaFiValue;
  }

  updateChartData() {
    // Stockbroking data
    let chartData = [];

    chartData.push({
      name: "Stockbroking",
      y: this.totalStbValue,
      percentageOfPortfolio: 0,
      percentageGain: 0
    });

    // Fixed Income data
    chartData.push({
      name: "Fixed Income",
      y: this.totalFiValue,
      percentageOfPortfolio: 0,
      percentageGain: 0
    });

    // SMA Data
    chartData.push({
      name: "SMA",
      y: this.totalSmaValue,
      percentageOfPortfolio: 0,
      percentageGain: 0
    });

    // Cash Data
    chartData.push({
      name: "Cash",
      y: this.totalNairaCashValue,
      percentageOfPortfolio: 0,
      percentageGain: 0
    });

    this.chartData = this.chartsProvider.getCspDefinedPieChart(chartData);
  }
}
