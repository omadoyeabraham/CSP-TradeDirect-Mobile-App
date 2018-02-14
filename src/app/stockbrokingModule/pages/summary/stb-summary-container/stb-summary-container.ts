import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { IAppState } from "../../../../store/models";
import { IPortfolio } from "../../../models/portfolio.interface";
import * as selectors from "../../../../store/selectors";

/**
 * Container component for stockbroking summary
 * This component handles all redux related activities pertaining to stockbroking summary
 *
 * @type Container/Smart component
 * @export
 * @class StbSummaryContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-summary-container",
  templateUrl: "stb-summary-container.html"
})
export class StbSummaryContainerPage {
  public activePortfolio: IPortfolio;
  public activePortfolioStockData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {
    this.activePortfolio = {} as any;
  }

  ionViewDidLoad() {
    this.store.select(selectors.getActivePortfolio).subscribe(portfolio => {
      this.activePortfolio = portfolio;
    });

    this.store
      .select(selectors.getActivePortfolioStockHoldingsGraphData)
      .subscribe(stockGraphData => {
        this.activePortfolioStockData = stockGraphData;
      });
  }
}
