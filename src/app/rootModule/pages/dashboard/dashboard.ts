import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import {
  getTotalStockbrokingValue,
  getTotalValueOfFixedIncomeInvestments,
  totalNairaCashValue,
  totalDollarCashValue,
  getTotalValueOfFxInvestments,
  getStbPortfolios
} from "../../../store";

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
  public totalNairaCashValue = 0;
  public totalNairaValue = 0;
  public totalFxFiValue = 0;
  public totalFxCashValue = 0;
  public totalFxValue = 0;

  public userHasStb: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
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
      this.totalFiValue + this.totalStbValue + this.totalNairaCashValue;
  }

  /**
   * Called to update the total dollar value after stb, fi, or cash values are updated
   * .
   * @memberof DashboardPage
   */
  updateTotalDollarValue() {
    this.totalFxValue = this.totalFxFiValue + this.totalFxCashValue;
  }
}
