import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import * as PAGES from "../../../../sharedModule/pages.constants";
import {
  getStbSecurityNames,
  getSortedTradeOrderTerms,
  getActivePortfolio,
  getStbSecurities,
  getActivePortfolioStockHoldings,
  TradeOrderActionsDispatcher,
  getTradeOrderTerms
} from "../../../../store";
import { MandateQuantityValidator } from "../../../validators/MandateFormValidators";
import { ITradeOrderTerm } from "../../../models/tradeOrderTerm.interface";
import { TradeOrderProvider } from "../../../providers/trade-order/trade-order";
import { catchError, map } from "rxjs/operators";
import { ITradeOrder, IPortfolio } from "../../../models";
import { UtilityProvider } from "../../../../sharedModule/services/utility/utility";

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
  public orderType: FormControl;
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public tradeOrderProvider: TradeOrderProvider,
    public tradeOrderActionsDispatcher: TradeOrderActionsDispatcher,
    private loadingCtrl: LoadingController,
    private utilityProvider: UtilityProvider
  ) {
    // Create form controls as local page variables. This helps shorten the syntax for error checking in the template
    this.orderType = new FormControl("BUY", Validators.required);
    this.security = new FormControl("ACCESS", Validators.required);
    this.unitsOwned = new FormControl();
    this.priceOption = new FormControl("LIMIT", Validators.required);
    this.limitPrice = new FormControl(1);
    this.quantity = new FormControl(
      1,
      Validators.compose([
        Validators.required,
        MandateQuantityValidator.isValid
      ])
    );
    this.orderTerm = new FormControl("", Validators.required);

    this.mandateForm = new FormGroup({
      orderType: this.orderType,
      security: this.security,
      priceOption: this.priceOption,
      limitPrice: this.limitPrice,
      quantity: this.quantity,
      orderTerm: this.orderTerm
    });
  }

  ionViewDidLoad() {
    // Select security names from the store
    this.store.select(getStbSecurityNames).subscribe(securityNames => {
      this.allSecurities = securityNames;
      this.securities = securityNames;
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

    /**
     * Watch the order type input, and set the securities based on the user's input
     * For sell orders, only display the stocks owned in the active account,
     * For buy orders display a list of all securities in the market
     */
    this.watchOrderTypeValueChanges();

    /**
     * Watch the selected security input, and set the units owned if its in the user's portfolio
     */
    this.watchSecurityValueChanges();
  }

  /**
   * Watch the security input and make appropriate changes
   *
   * @memberof PlaceMandatePage
   */
  watchSecurityValueChanges() {
    this.security.valueChanges.subscribe(securityName => {
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
   * Watch order type input and make appropriate changes
   *
   * @memberof PlaceMandatePage
   */
  watchOrderTypeValueChanges() {
    this.orderType.valueChanges.subscribe(orderType => {
      if (orderType === "SELL") {
        this.store
          .select(getActivePortfolioStockHoldings)
          .subscribe(holdings => {
            this.securities = holdings.map(holding => holding.securityName);
          });
      } else {
        this.securities = this.allSecurities;
      }
    });
  }

  /**
   * Function called when a user tries to preview a mandate
   *
   * @memberof PlaceMandatePage
   */
  previewMandate() {
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
          orderType: this.orderType.value,
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

              // Navigate to the execute mandate page
              this.navCtrl.push(PAGES.STB_EXECUTE_MANDATE_PAGE);
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
    let totalAmount: number;
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
}
