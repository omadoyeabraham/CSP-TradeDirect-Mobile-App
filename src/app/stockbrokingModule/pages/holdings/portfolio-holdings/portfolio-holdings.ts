import { Component } from "@angular/core";

/**
 * Presentational component for stockbroking portfolio holdings
 * This component displays stb portfolio holdings, and receives @Inputs and @Outputs from StbPortfolioHoldingsContainerPage
 *
 * @export
 * @class PortfolioHoldingsComponent
 */
@Component({
  selector: "portfolio-holdings",
  templateUrl: "portfolio-holdings.html"
})
export class PortfolioHoldingsComponent {
  text: string;

  constructor() {
    console.log("Hello PortfolioHoldingsComponent Component");
    this.text = "Hello World";
  }
}
