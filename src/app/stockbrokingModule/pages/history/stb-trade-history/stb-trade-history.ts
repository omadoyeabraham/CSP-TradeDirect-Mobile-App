import { Component, Input, OnInit } from "@angular/core";
import {
  TradeOrderActionsDispatcher,
  getTradeOrderCancellationState
} from "../../../../store";
import { AlertController, LoadingController } from "ionic-angular";
import {
  IAppState,
  ITradeOrderCancellationState
} from "../../../../store/models";
import { Store } from "@ngrx/store";
import { UtilityProvider } from "../../../../sharedModule/services/utility/utility";

/**
 * Component for display trade order history
 *
 * @type Presentational and Container Component
 * @export
 * @class StbTradeHistoryComponent
 */
@Component({
  selector: "csmobile-stb-trade-history",
  templateUrl: "stb-trade-history.html"
})
export class StbTradeHistoryComponent implements OnInit {
  @Input("tradeOrders") tradeOrders: Array<any>;
  @Input("outstandingTradeOrders") outstandingTradeOrders: Array<any>;
  public tradeOrderStatus: string = "outstanding";
  private isCancellingTradeOrder;

  constructor(
    private tradeOrderActionsDispatcher: TradeOrderActionsDispatcher,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private utilityProvider: UtilityProvider,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.store
      .select(getTradeOrderCancellationState)
      .subscribe((cancellationState: ITradeOrderCancellationState) => {
        // Show the spinner when cancelling the trade order
        if (cancellationState.isCancelling) {
          this.isCancellingTradeOrder = this.loadingCtrl.create({
            content: "Cancelling trade order..."
          });

          this.isCancellingTradeOrder.present();
        } else if (
          !cancellationState.cancellationFailed &&
          cancellationState.cancelledSuccessfully
        ) {
          // The order was cancelled successfully
          if (this.isCancellingTradeOrder) {
            // Dismiss the loader;
            this.isCancellingTradeOrder.dismiss();
          }
          // Show the success message
          this.utilityProvider.presentToast(
            "Trade order cancelled successfully",
            "toastSuccess"
          );
        } else if (
          cancellationState.cancellationFailed &&
          !cancellationState.cancelledSuccessfully
        ) {
          // The order cancellation failed
          if (this.isCancellingTradeOrder) {
            // Dismiss the loader;
            this.isCancellingTradeOrder.dismiss();
          }
          // Show the success message
          this.utilityProvider.presentToast(
            "Trade order cancellation failed",
            "toastError"
          );
        }
      });
  }

  /**
   * Cancel a trade order by dispatching an action to the store.
   * This component should ideally be presentational only, but I am tired right and cannot deal right now,
   * so I've added the @TODO here as a reminder that I need to refactor this component
   *
   * TODO: Refactor this method to be an @Output from the parent container component
   * @param {number} tradeOrderID
   * @memberof StbTradeHistoryComponent
   */
  cancelTradeOrder(tradeOrderID: number) {
    this.tradeOrderActionsDispatcher.cancelTradeOrder(tradeOrderID);
  }

  /**
   * Show the alert which allows users to cancel a trade order
   *
   * @param {number} tradeOrderID
   * @memberof StbTradeHistoryComponent
   */
  showCancelTradeOrderAlert(tradeOrderID: number) {
    let confirm = this.alertController.create({
      title: "Cancel Trade Order",
      message: "Are you sure you want to cancel this order",
      buttons: [
        {
          text: "No",
          role: "cancel"
        },
        {
          text: "Cancel",
          handler: () => {
            this.cancelTradeOrder(tradeOrderID);
          }
        }
      ]
    });

    confirm.present();
  }
}
