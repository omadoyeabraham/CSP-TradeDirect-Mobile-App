import { Component, Input } from "@angular/core";
import { IPortfolioHolding } from "../../../models/portfolioHolding.interface";

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
export class PortfolioHoldingsComponent {
  // The initial tab of holdings shown
  public holdingType: string = "stocks";

  @Input("stockHoldings") stockHoldings: IPortfolioHolding[];
  @Input("bondHoldings") bondHoldings: IPortfolioHolding[];

  constructor() {}
}
