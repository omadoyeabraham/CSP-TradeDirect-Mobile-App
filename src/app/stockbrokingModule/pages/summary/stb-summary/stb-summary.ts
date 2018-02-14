import { Component, Input } from "@angular/core";
import { IPortfolio } from "../../../models/portfolio.interface";

/**
 * Component for the STB summary
 * This component receives input data, and output functions from the StbSummaryContainerPage
 *
 * @Input portfolio {Observable<IPortfolio>} The portfolio data to be displayed
 * @type Presentational / Dump component
 * @export
 * @class StbSummaryComponent
 */
@Component({
  selector: "csmobile-stb-summary",
  templateUrl: "stb-summary.html"
})
export class StbSummaryComponent {
  @Input("portfolio") portfolio: IPortfolio;
  constructor() {
    console.log(this.portfolio);
    this.portfolio = {} as any;
  }

  ngOnInit() {
    console.log(this.portfolio);
  }
}
