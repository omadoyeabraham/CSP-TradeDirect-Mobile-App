import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import { smaHoldings, smaFiTotalValue, runningSmaFI } from "../../../store";
import { IPortfolioHolding } from "../../models";
import { IFixedIncomeInvestment } from "../../../fixedIncomeModule/models";

/**
 * Sma Page
 *
 * @type Container/Presentational
 * @export
 * @class SmaPage
 */
@IonicPage()
@Component({
  selector: "page-sma",
  templateUrl: "sma.html"
})
export class SmaPage {
  // The initial tab shown
  public investmentType: string = "equities";
  public holdings: IPortfolioHolding[];
  public fixedIncomeInvestments: IFixedIncomeInvestment[];
  public totalFixedIncomeValue: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    this.store.select(smaHoldings).subscribe(holdings => {
      this.holdings = holdings;
    });

    this.store.select(runningSmaFI).subscribe(investments => {
      this.fixedIncomeInvestments = investments;
    });

    this.store.select(smaFiTotalValue).subscribe(totalValue => {
      this.totalFixedIncomeValue = totalValue;
    });
  }
}
