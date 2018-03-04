import { Component, Input, OnInit } from "@angular/core";
import { IPortfolioHolding } from "../../../models/portfolioHolding.interface";
import { NavController } from "ionic-angular";
import { STB_PLACE_MANDATE_PAGE } from "../../../../sharedModule/pages.constants";
import { ISecurity } from "../../../models";
import { IAppState } from "../../../../store/models";
import { Store } from "@ngrx/store";
import { getMarketData } from "../../../../store";
import { SecuritiesActionsDispatcher } from "../../../../store/actions/stockbroking/securities.actions";

/**
 * Presentational component for stockbroking portfolio holdings
 * This component displays stb portfolio holdings, and receives @Inputs and @Outputs from StbPortfolioHoldingsContainerPage
 *
 * @export
 * @class PortfolioHoldingsComponent
 */
@Component({
  selector: "csmobile-portfolio-holdings",
  templateUrl: "portfolio-holdings.html"
})
export class PortfolioHoldingsComponent implements OnInit {
  // The initial tab of holdings shown
  public holdingType: string = "stocks";

  @Input("stockHoldings") stockHoldings: IPortfolioHolding[];
  @Input("bondHoldings") bondHoldings: IPortfolioHolding[];
  public marketSecurities: Array<ISecurity>

  constructor(public navCtrl: NavController, public store: Store<IAppState>,
    public securitiesActionsDispatcher: SecuritiesActionsDispatcher) { }

  ngOnInit() {
    // Select the securities with market data from the store
    this.store
      .select(getMarketData)
      .subscribe(marketData => (this.marketSecurities = marketData));

  }

  /**
   * Move to the mandate page and select the securityName, also dispatch the action that sets the selectedSecurity in the store
   * 
   * @param {any} [securityName=null] 
   * @memberof PortfolioHoldingsComponent
   */
  goToMandatePage(securityName = null) {
    const selectedSecurity = this.marketSecurities.filter(
      sec => sec.name === securityName
    )[0];

    this.securitiesActionsDispatcher.setSelectedSecurityOnOverviewPage(
      selectedSecurity
    );

    this.navCtrl.push(STB_PLACE_MANDATE_PAGE, {
      securityName
    });
  }
}
