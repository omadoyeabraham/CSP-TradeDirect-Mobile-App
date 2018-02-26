import { Component, Input } from "@angular/core";

/**
 * Component for display trade order history
 *
 * @type Presentational Component
 * @export
 * @class StbTradeHistoryComponent
 */
@Component({
  selector: "csmobile-stb-trade-history",
  templateUrl: "stb-trade-history.html"
})
export class StbTradeHistoryComponent {
  @Input("tradeOrders") tradeOrders: Array<any>;
  @Input("outstandingTradeOrders") outstandingTradeOrders: Array<any>;
  public tradeOrderStatus: string = "outstanding";
  private lastToggledDiv: any;

  constructor() {}

  /**
   * Used to toggle the visibility of a TradeOrder's details when it is clicked on
   *
   * @param {any} $event
   * @memberof StbTradeHistoryContainerPage
   */
  toggleTradeOrderDisplay($event) {
    let tradeOrderDiv = $event.srcElement;
    tradeOrderDiv = tradeOrderDiv.parentNode.parentNode.parentNode;

    // A div has been clicked on
    if (this.lastToggledDiv) {
      if (this.lastToggledDiv === tradeOrderDiv) {
        this.lastToggledDiv.classList.toggle("showDetails");
      } else {
        this.lastToggledDiv.classList.remove("showDetails");
        tradeOrderDiv.classList.toggle("showDetails");
      }
    } else {
      // No Div previously clicked on
      tradeOrderDiv.classList.toggle("showDetails");
    }

    this.lastToggledDiv = tradeOrderDiv;
  }
}
