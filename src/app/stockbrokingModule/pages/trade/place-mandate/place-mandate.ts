import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
// import * as PAGES from "../../../../sharedModule/pages.constants";
import {
  getStbSecurityNames,
  getSortedTradeOrderTerms,
  getActivePortfolio,
  getStbSecurities,
  getActivePortfolioStockHoldings,
  TradeOrderActionsDispatcher,
  getTradeOrderTerms,
  getMarketData,
  getSelectedSecurityPriceMovements,
  getSelectedSecurityBids,
  getSelectedSecurityOffers
} from "../../../../store";
import { MandateQuantityValidator } from "../../../validators/MandateFormValidators";
import { ITradeOrderTerm } from "../../../models/tradeOrderTerm.interface";
import { TradeOrderProvider } from "../../../providers/trade-order/trade-order";
import { ITradeOrder, IPortfolio, ISecurity } from "../../../models";
import { UtilityProvider } from "../../../../sharedModule/services/utility/utility";
import { DomSanitizer } from "@angular/platform-browser";
import { SecuritiesActionsDispatcher } from "../../../../store/actions/stockbroking/securities.actions";

/**
 * Page used when creating a mandate to be previewed before it is executed
 *
 * @type Container & presentational
 * @export
 * @class PlaceMandatePage
 */
@IonicPage()
@Component({
  selector: "page-place-mandate",
  templateUrl: "place-mandate.html"
})
export class PlaceMandatePage {
  private activePortfolio: IPortfolio;
  public previewedOrderTotalAmount: string;
  public totalAmount: number;
  // public orderType: FormControl;
  public security: FormControl;
  public unitsOwned: any;
  public priceOption: FormControl;
  public limitPrice: FormControl;
  public quantity: FormControl;
  public orderTerm: FormControl;
  public securities: string[];
  public allSecurities: string[];
  public tradeOrderTerms: Array<ITradeOrderTerm>;
  private mandateForm: FormGroup;
  public submitAttempt: boolean = false;
  public validLimitPrice: boolean = true;
  public previewingMandate: boolean = false;
  private loader: any;
  public canSell: boolean = false;
  public canBuy: boolean = false;
  public bids: Array<any> = [];
  public offers: Array<any> = [];
  public trades: Array<any> = [];
  public bidsOffersTrades: string = "bidsOffers";
  public marketSecurities: Array<ISecurity>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public tradeOrderProvider: TradeOrderProvider,
    public tradeOrderActionsDispatcher: TradeOrderActionsDispatcher,
    private loadingCtrl: LoadingController,
    private utilityProvider: UtilityProvider,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer,
    private securitiesActionsDispatcher: SecuritiesActionsDispatcher
  ) {
    // Get the navParams if any
    const paramSecurityName = this.navParams.get("securityName");
    // const paramOrderType = this.navParams.get("orderType");

    // Create form controls as local page variables. This helps shorten the syntax for error checking in the template
    // this.orderType = new FormControl("", Validators.required);
    this.security = new FormControl(paramSecurityName, Validators.required);
    this.priceOption = new FormControl("LIMIT", Validators.required);
    this.limitPrice = new FormControl();
    this.quantity = new FormControl(
      "",
      Validators.compose([
        Validators.required,
        MandateQuantityValidator.isValid
      ])
    );
    this.orderTerm = new FormControl("", Validators.required);

    // orderType: this.orderType,
    this.mandateForm = new FormGroup({
      security: this.security,
      priceOption: this.priceOption,
      limitPrice: this.limitPrice,
      quantity: this.quantity,
      orderTerm: this.orderTerm
    });
  }
  /**
   *
   *
   * @memberof PlaceMandatePage
   */
  ionViewDidLoad() {
    // Select security names from the store
    this.store.select(getStbSecurityNames).subscribe(securityNames => {
      this.allSecurities = securityNames;
      this.securities = securityNames;
    });

    // Select the securities with market data from the store
    this.store
      .select(getMarketData)
      .subscribe(marketData => (this.marketSecurities = marketData));

    // Subscribe to store and get data for graph plotting
    this.store
      .select(getSelectedSecurityPriceMovements)
      .subscribe(graphData => {
        if (graphData) {
          // Get only 10 trades to be displayed
          // this.trades = graphData.filter((trade, index) => {
          //   return index <= 9;
          // });
          this.trades = graphData;
        } else {
          this.trades = [];
        }
      });

    // Subscribe to store and get bids
    this.store.select(getSelectedSecurityBids).subscribe(bids => {
      // Only select 10 bids to be displayed
      // this.bids = bids.filter((bid, index) => {
      //   return index <= 9;
      // });
      this.bids = bids;
    });

    // Subscribe to store and get offers
    this.store.select(getSelectedSecurityOffers).subscribe(offers => {
      // this.offers = offers.filter((offer, index) => {
      //   return index <= 9;
      // });
      this.offers = offers;
    });

    // Select trade order terms from store
    this.store.select(getSortedTradeOrderTerms).subscribe(tradeOrderTerms => {
      this.tradeOrderTerms = tradeOrderTerms;
    });

    // Subscribe to the active portfolio from the store
    this.store
      .select(getActivePortfolio)
      .subscribe((activePortfolio: IPortfolio) => {
        this.activePortfolio = activePortfolio;
      });

    // Watch the limit price input, so the error div's visibility is dynamically controlled based on the input's value
    this.limitPrice.valueChanges.subscribe(value => {
      this.validLimitPrice = value > 0;
    });

    // Set the no of unitsOwned based on the security selected
    this.store.select(getActivePortfolioStockHoldings).subscribe(holdings => {
      let holding = holdings.filter(
        holding => holding.securityName === this.security.value
      )[0];
      if (holding) {
        this.unitsOwned = holding.quantityHeld;
      } else {
        this.unitsOwned = 0;
      }
    });

    /**
     * Watch the order type input, and set the securities based on the user's input
     * For sell orders, only display the stocks owned in the active account,
     * For buy orders display a list of all securities in the market
     */
    // this.watchOrderTypeValueChanges();

    /**
     * Watch the selected security input, and set the units owned if its in the user's portfolio
     */
    this.watchSecurityValueChanges();

    /**
     * Watch the entire mandateForm, and change the canBuy, and canSell variables (used to set the disabled property of the buy and sell buttons)
     */
    this.watchMandateFormValueChanges();
  }

  /**
   * Watch the mandateForm's "valid" value and set the canSell, and canBuy variables
   *
   * @memberof PlaceMandatePage
   */
  watchMandateFormValueChanges() {
    this.mandateForm.valueChanges.subscribe(mandateFormValue => {
      if (this.mandateForm.valid) {
        this.canBuy = true;
        this.canSell = true;
      } else {
        this.canBuy = false;
        this.canSell = false;
      }
    });
  }

  /**
   * Watch the security input and make appropriate changes
   *
   * @memberof PlaceMandatePage
   */
  watchSecurityValueChanges() {
    this.security.valueChanges.subscribe(securityName => {
      // Set the selected security in the store
      const selectedSecurity = this.marketSecurities.filter(
        sec => sec.name === securityName
      )[0];

      this.securitiesActionsDispatcher.setSelectedSecurityOnOverviewPage(
        selectedSecurity
      );

      // Set the no of unitsOwned based on the security selected
      this.store.select(getActivePortfolioStockHoldings).subscribe(holdings => {
        let holding = holdings.filter(
          holding => holding.securityName === securityName
        )[0];
        if (holding) {
          this.unitsOwned = holding.quantityHeld;
        } else {
          this.unitsOwned = 0;
        }
      });
    });
  }

  /**
   * Function called when a user tries to preview a mandate
   *
   * @orderType {string} The type of the order {BUY | SELL}
   * @memberof PlaceMandatePage
   */
  previewMandate(orderType: string) {
    this.submitAttempt = true;

    if (!this.mandateForm.valid) {
      // Form Validation has failed
      return;
    } else {
      // Validation for required fields has passed, carryout other non-required validation checks depending on the users's input
      if (!this.validateNonRequiredFormFields()) {
        return;
      } else {
        // Validation for non-required fields passed, so preview the form

        // Create the tradeOrder Object
        const tradeOrder: ITradeOrder = {
          // orderType: this.orderType.value,
          orderType: orderType,
          priceType: this.priceOption.value,
          instrument: this.security.value,
          orderTermName: this.orderTerm.value,
          quantityRequested: this.quantity.value,
          limitPrice: this.limitPrice.value,
          orderOrigin: "MOBILE_APP",
          orderCurrency: "NGN",
          portfolioLabel: this.activePortfolio.label,
          portfolioName: this.activePortfolio.name
        };

        // Show the loader
        this.presentLoader("Calculating Order Cost...");

        this.tradeOrderProvider.previewTradeOrder(tradeOrder).subscribe(
          data => {
            let returnedTradeOrderTotal = this.handleMandatePreviewResponse(
              data
            );

            /**
             * The API call returned a valid trade order total amount, so we get the tradeOrder's metadata (consideration, fees e.t.c) and then move on to the execute mandate page, after dispatching an action
             * to place the current tradeOrder and its totalAmount in the store
             */
            if (returnedTradeOrderTotal) {
              const tradeOrderWithMetaData = this.calculateTradeOrderMetaData(
                tradeOrder
              );

              // Dispatch action to save the previewed trade order in the store
              this.tradeOrderActionsDispatcher.savePreviewedTradeOrderInStore(
                tradeOrderWithMetaData
              );

              // Display the confirmation popup for the order
              this.displayMandateConfirmationPopup(tradeOrderWithMetaData);

              // Navigate to the execute mandate page
              // this.navCtrl.push(PAGES.STB_EXECUTE_MANDATE_PAGE);
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

  /**
   * Validations for all mandateForm fields which are not required fields
   *
   * @memberof PlaceMandatePage
   */
  validateNonRequiredFormFields() {
    // Check to ensure that a limit price is set if it's a limit order
    if (this.priceOption.value === "LIMIT") {
      if (this.limitPrice.value <= 0) {
        this.validLimitPrice = false;
        return false;
      } else {
        this.validLimitPrice = true;
      }
    }

    return true;
  }

  /**
   * Display the loader when calculating the total order cost
   *
   * @memberof PlaceMandatePage
   */
  presentLoader(message: string = "Calculating Order Cost..."): void {
    this.loader = this.loadingCtrl.create({
      content: message
    });

    this.loader.present();
  }

  /**
   * Handle the response from the call to getTradeOrderTotal and handle the response accordingly
   *
   * @param {*} data
   * @returns boolean  Which determines whether or not a trade order total was returned
   * @memberof PlaceMandatePage
   */
  handleMandatePreviewResponse(data: any): any {
    // let totalAmount: number;
    let errorStatus: string;

    /**
     * The API call currently returns the error message as a 200 data object with a status key on the data object holding the error message.
     * This ideally should not be, as the API should return a 500 with the error message, but this handles the current case pending when it is
     * fixed (if ever :) )
     */
    errorStatus = data.body.status ? data.body.status : null;
    if (errorStatus) {
      this.utilityProvider.presentToast(errorStatus, "toastError", 5000);

      // Only attempt to dismiss the loader if it is already visible
      if (this.loader) {
        this.loader.dismiss();
      }
      return false;
    } else {
      /**
       * In the event that no error status is present, then we have an amount returned (the order total cost)
       */
      this.totalAmount = Number(parseFloat(data.body.amount).toFixed(2));

      // Only attempt to dismiss the loader if it is already visible
      if (this.loader) {
        this.loader.dismiss();
      }
      return true;
    }
  }

  /**
   * Format the total amount to display negative numbers in a user friendly format
   *
   * @param {number} totalAmount
   * @returns {string}
   * @memberof PlaceMandatePage
   */
  formatTradeOrderTotal(totalAmount: number) {
    let formattedTotalAmount: string;

    if (totalAmount < 0) {
      totalAmount = Math.abs(totalAmount);
      formattedTotalAmount = totalAmount.toLocaleString();
      formattedTotalAmount = `(${formattedTotalAmount})`;
    } else {
      formattedTotalAmount = totalAmount.toLocaleString();
    }

    return "₦" + formattedTotalAmount;
  }

  /**
   * Calculate the metadata (consideration, fees) for a trade order, and return a new trade order with the metadata included.
   *
   * @param {ITradeOrder} tradeOrder
   * @return {ITradeorder}
   * @memberof PlaceMandatePage
   */
  calculateTradeOrderMetaData(tradeOrder: ITradeOrder): ITradeOrder {
    const consideration = this.calculateConsideration(tradeOrder);
    const totalFees = this.calculateTotalFees(
      tradeOrder,
      consideration,
      this.totalAmount
    );
    this.previewedOrderTotalAmount = this.formatTradeOrderTotal(
      this.totalAmount
    );
    const tradeOrderTotalDescription = this.getTradeOrderTotalDescription(
      tradeOrder
    );
    const orderTermLabel = this.getTradeOrderTermLabel(
      tradeOrder.orderTermName
    );
    let cashAvailableForTrading;
    this.store.select(getActivePortfolio).subscribe(portfolio => {
      cashAvailableForTrading = portfolio.availableCash.amount;
    });

    return {
      ...tradeOrder,
      consideration,
      totalFees,
      tradeOrderTotal: this.totalAmount,
      formattedTradeOrderTotal: this.previewedOrderTotalAmount,
      tradeOrderTotalDescription,
      orderTermLabel,
      cashAvailableForTrading
    };
  }

  /**
   * Calculate the consideration for a tradeOrder
   *
   * @param {ITradeOrder} tradeOrder
   * @returns {any}
   * @memberof PlaceMandatePage
   */
  calculateConsideration(tradeOrder: ITradeOrder): any {
    let consideration: any;

    // For limit Orders
    if (tradeOrder.priceType === "LIMIT") {
      consideration = tradeOrder.limitPrice * tradeOrder.quantityRequested;
      consideration.toFixed(2);
    } else {
      // For market orders
      let selectedSecurity: any;
      this.store.select(getStbSecurities).subscribe(securities => {
        selectedSecurity = securities.filter(
          security => tradeOrder.instrument === security.name
        );
      });

      const lastTradePrice = parseFloat(selectedSecurity[0].lastTradePrice);
      const percentageOfLastTradePrice = 10 / 100 * lastTradePrice;
      consideration =
        tradeOrder.quantityRequested *
        (lastTradePrice + percentageOfLastTradePrice);
    }

    return consideration.toFixed(2);
  }

  /**
   * Calculate the total fees for the trade order
   *
   * @param {ITradeOrder} tradeOrder
   * @param {number} Consideration
   * @returns {*}
   * @memberof PlaceMandatePage
   */
  calculateTotalFees(
    tradeOrder: ITradeOrder,
    consideration: number,
    totalAmount: number
  ): any {
    let totalFees: number = 0;
    if (tradeOrder.orderType === "BUY") {
      // BUY ORDERS
      totalFees = totalAmount - consideration;
    } else {
      // SELL ORDERS
      totalFees = consideration - totalAmount;
    }

    return totalFees.toFixed(2);
  }

  /**
   * Return the description for the trade order total dependent on the order type
   *
   * @param {ITradeOrder} tradeOrder
   * @returns {string}
   * @memberof PlaceMandatePage
   */
  getTradeOrderTotalDescription(tradeOrder: ITradeOrder): string {
    if (tradeOrder.orderType === "BUY") {
      return "TOTAL ESTIMATED COST";
    } else {
      return "TOTAL ESTIMATED PROCEEDS";
    }
  }

  /**
   * Return the trade order term label for a trade order term name
   *
   * @param {string} orderTermName
   * @memberof PlaceMandatePage
   */
  getTradeOrderTermLabel(orderTermName: string) {
    let orderTerm: ITradeOrderTerm;
    this.store.select(getTradeOrderTerms).subscribe(orderTerms => {
      orderTerm = orderTerms.filter(
        orderTerm => orderTerm.name === orderTermName
      )[0];
    });

    return orderTerm.label;
  }

  /**
   * Display the confirmation popup requesting that the user confirm the mandate before it is placed.
   *
   * @param {any} tradeOrderWithMetaData
   * @memberof PlaceMandatePage
   */
  displayMandateConfirmationPopup(tradeOrderWithMetaData) {
    const {
      orderType,
      // priceOption,
      priceType,
      limitPrice,
      // tradeOrderTotal,
      totalFees,
      formattedTradeOrderTotal,
      // totalAmount,
      instrument,
      quantityRequested,
      consideration
    } = tradeOrderWithMetaData;

    let message: any;
    let title: any;

    // Set the message format for LIMIT orders
    if (priceType === "LIMIT") {
      message = `
        <div>
          <span class="d--inline--block w50p"><b>Symbol</b></span>
          <span> ${instrument} </span>
        </div>
        <div>
          <span class="d--inline--block w50p"><b>Price</b></span>
          <span> ₦${limitPrice} </span>
        </div>
        <div>
          <span class="d--inline--block w50p"> <b>Amount</b> </span>
          <span> ₦${consideration} </span>
        </div>
        <div>
          <span class="d--inline--block w50p"> <b>Fee</b> </span>
          <span> ₦${totalFees} </span>
        </div>
        <div>
          <span class="d--inline--block w50p"> <b>Total</b> </span>
          <span> ${formattedTradeOrderTotal} </span>
        </div>
      `;
      message = this.sanitizer.bypassSecurityTrustHtml(message);
    }

    // Set the message for MARKET orders
    if (priceType === "MARKET") {
      message = `You are about to ${orderType.toLowerCase()} ${quantityRequested} units(s) of ${instrument} @ market price`;
    }

    // Set the title
    title = `<span class="font-size-14"> ${orderType} ${priceType} </span>`;

    let confirm = this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: `${orderType}`,
          handler: () => {
            this.executeTradeOrder(tradeOrderWithMetaData);
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Execute the tradeOrder on the floor of the Nigerian Stock Exchange
   *
   * @memberof ExecuteMandatePage
   */
  executeTradeOrder(tradeOrder) {
    // Show the loading spinner
    let loader = this.loadingCtrl.create({
      content: "Placing Mandate..."
    });
    loader.present();

    // Execute the trade order
    this.tradeOrderProvider.executeTradeOrder(tradeOrder).subscribe(
      data => {
        loader.dismiss();

        if (typeof data.body === "number") {
          // Mandate placement was successfull, and the tradeorder ID was returned

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
        } else {
          /**
           * Mandate Placement was unsuccessful, and an error string was returned.
           * This ideally should not have a status code of 200, but leave it to Zanibal to
           * do ridiculous stuff :)
           */
        }
      },

      err => {
        console.log(err), loader.dismiss();
        this.utilityProvider.presentToast(
          "Mandate placement timed out. Please try again later",
          "toastError",
          4000
        );
      }
    );
  }
}
