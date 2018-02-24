import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import { getStbSecurityNames } from "../../../../store";
import { MandateQuantityValidator } from "../../../validators/MandateQuantity";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {
    // Create form controls as local page variables. This helps shorten the syntax for error checking in the template
    this.orderType = new FormControl("", Validators.required);
    this.security = new FormControl("", Validators.required);
    this.unitsOwned = new FormControl();
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
    this.store.select(getStbSecurityNames).subscribe(securityNames => {
      this.securities = securityNames;
    });
  }

  /**
   * Function called when a user tries to place a mandate
   *
   * @memberof PlaceMandatePage
   */
  previewMandate() {
    this.submitAttempt = true;

    if (!this.mandateForm.valid) {
      // Form Validation has failed
      console.log("Preview mandate function called");
      this.submitAttempt = false;
      return;
    } else {
      // Validation for required fields has passed, carryout other non-required validation checks depending on the users's input

      console.log("Validating extra fields");

      // Check to ensure that a limit price is set if it's a limit order
      if (this.orderType.value === "LIMIT") {
        if (this.limitPrice.value <= 0) {
          console.log("Limit Price must be > zero");
        }
      }
    }
  }
}
