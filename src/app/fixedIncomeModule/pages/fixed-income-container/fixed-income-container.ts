import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { IAppState } from "../../../store/models";
import {
  getRunningFixedIncomeInvestments,
  getTerminatedFixedIncomeInvestments,
  getTotalValueOfFixedIncomeInvestments
} from "../../../store";
import { Store } from "@ngrx/store";
import { IFixedIncomeInvestment } from "../../models";

/**
 * Container page which houses the fixed income page
 *
 * @type Container / Smart component
 * @export
 * @class FixedIncomeContainerPage
 */
@IonicPage()
@Component({
  selector: "page-fixed-income-container",
  templateUrl: "fixed-income-container.html"
})
export class FixedIncomeContainerPage {
  public runningInvestments: IFixedIncomeInvestment[] = [];
  public terminatedInvestments: IFixedIncomeInvestment[] = [];
  public totalFixedIncomeValue: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    // Subscribe and get running fixed income investments from the store
    this.store
      .select(getRunningFixedIncomeInvestments)
      .subscribe(
        runningInvestments => (this.runningInvestments = runningInvestments)
      );

    // Subscribe and get terminated investments from store
    this.store
      .select(getTerminatedFixedIncomeInvestments)
      .subscribe(terminatedInvestments => {
        this.terminatedInvestments = terminatedInvestments;
        console.log(terminatedInvestments);
      });

    // Subscribe and get total FI Value from store
    this.store
      .select(getTotalValueOfFixedIncomeInvestments)
      .subscribe(totalValue => (this.totalFixedIncomeValue = totalValue));
  }
}
