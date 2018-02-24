import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import { getStbSecurityNames } from "../../../../store";
import { MandateQuantityValidator, LimitPriceValidator } from "../../../validators/MandateFormValidators";

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
  public orderType: FormControl;
  public security: FormControl;
  public unitsOwned: FormControl;
  public priceOption: FormControl;
  public limitPrice: FormControl;
  public quantity: FormControl;
  public orderTerm: FormControl;
  public securities: string[];
  private mandateForm: FormGroup;
  public submitAttempt: boolean = false;
  public validLimitPrice: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {
    // Create form controls as local page variables. This helps shorten the syntax for error checking in the template
    this.orderType = new FormControl("", Validators.required);
    this.security = new FormControl("", Validators.required);
    this.unitsOwned = new FormControl();
    this.priceOption = new FormControl("", Validators.required);
    this.limitPrice = new FormControl("");
    this.quantity = new FormControl(
      "",
      Validators.compose([
        Validators.required,
        MandateQuantityValidator.isValid
      ])
    );
    this.orderTerm = new FormControl("", Validators.required);

    this.mandateForm = new FormGroup({
      orderType: this.orderType,
      security: this.security,
      unitsOwned: this.unitsOwned,
      priceOption: this.priceOption,
      limitPrice: this.limitPrice,
      quantity: this.quantity,
      orderTerm: this.orderTerm
    });
  }

  ionViewDidLoad() {
    // Select security names from the store
    this.store.select(getStbSecurityNames).subscribe(securityNames => {
      this.securities = securityNames;
    });

    // Watch the limit price input, so the error div's visibility is dynamically controlled based on the input's value
    this.limitPrice.valueChanges.subscribe(value => {
      this.validLimitPrice = (value > 0)
    })
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
      console.log("Validation for required fields failed");
      return;
    } else {
      // Validation for required fields has passed, carryout other non-required validation checks depending on the users's input
      if(!this.validateNonRequiredFormFields()) {
        return;
      } else {
        // Validation for non-required fields passed, so preview the form
        console.log('Previewing the mandate ....');
      }

    }
  }

  /**
   * Validations for all mandateForm fields which are not required fields
   * 
   * @memberof PlaceMandatePage
   */
  validateNonRequiredFormFields() {
    console.log("Validating extra fields");

     // Check to ensure that a limit price is set if it's a limit order
    if (this.priceOption.value === "LIMIT") {
      if (this.limitPrice.value <= 0) {
        this.validLimitPrice = false;
        return false;
      } else {
        this.validLimitPrice = true
      }
    }

    return true;

  }

}
