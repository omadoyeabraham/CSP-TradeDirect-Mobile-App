import { FormControl } from "@angular/forms";

/**
 * Custom Validator for the quantity field on our mandate form
 *
 * @export
 * @class MandateQuantityValidator
 */
export class MandateQuantityValidator {
  static isValid(control: FormControl): any {
    if (control.value % 1 !== 0) {
      return {
        "not a whole number": true
      };
    }

    return null;
  }
}
