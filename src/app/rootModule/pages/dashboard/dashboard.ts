import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import * as PAGES from "../../../sharedModule/pages.constants";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import {
  getTotalStockbrokingValue,
  getTotalValueOfFixedIncomeInvestments
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

  public totalStbValue = 0;
  public totalFiValue = 0;
  public totalNairaValue = 0;
  public totalFxFiValue = 0;
  public totalFxValue = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    // Get the total value of stockbroking investments
    this.store
      .select(getTotalStockbrokingValue)
      .subscribe(totalStbValue => (this.totalStbValue = totalStbValue));
    // Get the total value of naira fixed income investments
    this.store
      .select(getTotalValueOfFixedIncomeInvestments)
      .subscribe(totalFiValue => (this.totalFiValue = totalFiValue));
    // Total value of naira investments
    this.totalNairaValue = this.totalFiValue + this.totalStbValue;

    // Get the total value of fx investments
    this.store
      .select(getTotalValueOfFixedIncomeInvestments)
      .subscribe(totalFxValue => (this.totalFxFiValue = totalFxValue));
    this.totalFxValue = this.totalFxFiValue;
  }

  /**
   * Navigate to various pages using ionic's nav controller
   *
   * @param pageName String use by angular to lazyload the page component
   */
  goToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }
}
