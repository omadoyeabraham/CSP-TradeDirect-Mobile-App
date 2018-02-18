import { Component, Input } from "@angular/core";

import { ISecurity } from "../../../models";

/**
 * Presentational component which displays all equities with their pictures
 *
 * @type Presentational
 * @export
 * @class TradeOverviewComponent
 */
@Component({
  selector: "csmobile-trade-overview",
  templateUrl: "trade-overview.html"
})
export class TradeOverviewComponent {
  constructor() {}

  @Input("securities") securities: ISecurity[];
}
