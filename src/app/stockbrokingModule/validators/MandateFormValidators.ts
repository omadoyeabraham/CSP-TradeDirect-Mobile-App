import { FormControl } from "@angular/forms";

/**
 * Custom Validator for the quantity field on our mandate form
 *
 * @export
 * @class MandateQuantityValidator
 */
export class MandateQuantityValidator {
  static isValid(control: FormControl): any {
    if (control.value % 1 !== 0 || control.value <= 0) {
      return {
        "not a whole number": true
      };
    }

    return null;
  }
}

/**
 * ustom Validator for the limitPrice field on our mandate form
 *
 * @status currently unused
 * @export
 * @class LimitPriceValidator
 */
export class LimitPriceValidator {
  static isValid(form: any): any {
    // const form: any = control.root ? control.root : {};
    // form.controls.priceOption.value === 'LIMIT') &&

    // Only valid the limit price input, if the price option is LIMIT
    if (form.value <= 0) {
      return {
        "invalid limit price": true
      };
    }

    return null;
  }
}
