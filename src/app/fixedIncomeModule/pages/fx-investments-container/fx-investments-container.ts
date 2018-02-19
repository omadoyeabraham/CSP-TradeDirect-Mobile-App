import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import {
  getRunningFxInvestments,
  getTerminatedFxInvestments,
  getTotalValueOfFxInvestments
} from "../../../store";
import { IFixedIncomeInvestment } from "../../models";

/**
 * Generated class for the FxInvestmentsContainerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-fx-investments-container",
  templateUrl: "fx-investments-container.html"
})
export class FxInvestmentsContainerPage {
  public runningInvestments: IFixedIncomeInvestment[] = [];
  public terminatedInvestments: IFixedIncomeInvestment[] = [];
  public totalFxValue: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    // Subscribe and get running fx investments from the store
    this.store
      .select(getRunningFxInvestments)
      .subscribe(
        runningInvestments => (this.runningInvestments = runningInvestments)
      );

    // Subscribe and get terminated investments from store
    this.store
      .select(getTerminatedFxInvestments)
      .subscribe(
        terminatedInvestments =>
          (this.terminatedInvestments = terminatedInvestments)
      );

    // Subscribe and get total FX Value from store
    this.store
      .select(getTotalValueOfFxInvestments)
      .subscribe(totalValue => (this.totalFxValue = totalValue));
  }
}
