import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import * as selectors from "../../../../store/selectors";
import { IPortfolioHolding } from "../../../models/portfolioHolding.interface";

/**
 * Container component for stockbroking portfolio holdings
 * This component handles all redux activities related to portfolio holdings
 *
 * @type Container/Smart component
 * @export
 * @class StbPortfolioHoldingsContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-portfolio-holdings-container",
  templateUrl: "stb-portfolio-holdings-container.html"
})
export class StbPortfolioHoldingsContainerPage {
  public activePortfolioStockHoldings: IPortfolioHolding[];
  public activePortfolioBondHoldings: IPortfolioHolding[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    // Subscribe to stock holdings of the currently selected portfolio
    this.store
      .select(selectors.getActivePortfolioStockHoldings)
      .subscribe(stockHoldings => {
        this.activePortfolioStockHoldings = stockHoldings;
      });

    // Subscribe to bond holdings of the currently selected portfolio
    this.store
      .select(selectors.getActivePortfolioBondHoldingsWithMetaData)
      .subscribe(bondHoldings => {
        this.activePortfolioBondHoldings = bondHoldings;
      });
  }
}
