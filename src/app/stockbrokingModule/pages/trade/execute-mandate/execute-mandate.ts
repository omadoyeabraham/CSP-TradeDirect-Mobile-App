import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { ITradeOrder } from "../../../models";
import { IAppState } from "../../../../store/models";
import { Store } from "@ngrx/store";
import {
  getPreviewedTradeOrder,
  TradeOrderActionsDispatcher
} from "../../../../store";
import { TradeOrderProvider } from "../../../providers/trade-order/trade-order";
import { UtilityProvider } from "../../../../sharedModule/services/utility/utility";

/**
 * Page which displays the previewed mandate by the user, and provides the option to cancel or execute the mandate.
 *
 * @type Container and Presentational
 * @export
 * @class ExecuteMandatePage
 */
@IonicPage()
@Component({
  selector: "page-execute-mandate",
  templateUrl: "execute-mandate.html"
})
export class ExecuteMandatePage {
  public tradeOrder: ITradeOrder = {} as ITradeOrder;
  private orderPromptMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public tradeOrderProvider: TradeOrderProvider,
    public utilityProvider: UtilityProvider,
    public tradeOrderActionsDispatcher: TradeOrderActionsDispatcher
  ) {}

  ionViewDidLoad() {
    // Subscribe to the previewed trade order from the store
    this.store
      .select(getPreviewedTradeOrder)
      .subscribe(tradeOrder => (this.tradeOrder = tradeOrder));
  }

  /**
   * Produces an alert which prompts the user to accept the trade order placement
   *
   * @memberof ExecuteMandatePage
   */
  alertBeforeTradeOrderExecution() {
    const orderType = this.tradeOrder.orderType.toLowerCase();
    const units = this.tradeOrder.quantityRequested;
    const stock = this.tradeOrder.instrument;
    const limitPrice = this.tradeOrder.limitPrice;

    if (this.tradeOrder.priceType === "MARKET") {
      this.orderPromptMessage = `You are about to ${orderType} ${units} units(s) of ${stock} @ market price`;
    } else {
      this.orderPromptMessage = `You are about to ${orderType} ${units} units(s) of ${stock} @ limit price of  ₦${limitPrice}`;
    }

    // Show the confirmation alert
    const confirmPrompt = this.alertCtrl.create({
      title: "Execute your mandate",
      message: this.orderPromptMessage,
      buttons: [
        {
          text: this.tradeOrder.orderType,
          handler: () => {
            this.executeTradeOrder();
          }
        },
        {
          text: "Cancel",
          handler: () => {}
        }
      ]
    });

    confirmPrompt.present();
  }

  /**
   * Execute the tradeOrder on the floor of the Nigerian Stock Exchange
   *
   * @memberof ExecuteMandatePage
   */
  executeTradeOrder() {
    // Show the loading spinner
    let loader = this.loadingController.create({
      content: "Placing Mandate..."
    });
    loader.present();

    // Execute the trade order
    this.tradeOrderProvider.executeTradeOrder(this.tradeOrder).subscribe(
      data => {
        loader.dismiss();

        // Clear the previewed trade order from the store
        this.tradeOrderActionsDispatcher.clearPreviewedTradeOrder();

        // Refresh the user's trade order history
        this.tradeOrderActionsDispatcher.getTradeOrderHistory();

        /**
         * Move to the tradeHistory tab (3rd tab).
         * nav.push() was not used, because it pushes the trade history page unto the trade tab,
         * instead of moving to the tradeHistory tab
         */
        this.navCtrl.parent.select(3);

        this.utilityProvider.presentToast(
          "Mandate placement successful",
          "toastSuccess",
          4000
        );
      },

      err => {
        console.log(err), loader.dismiss();
      }
    );
  }

  /**
   * Cancel the previewed order and go back to the Place mandate page
   *
   * @memberof ExecuteMandatePage
   */
  cancelOrder(): void {
    this.navCtrl.pop();
  }

  move() {
    console.log(this.navCtrl.parent._tabs[3]);
  }
}
