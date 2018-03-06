import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";

import { ICashAccountInterface } from "../../models/cashAccount.interface";

/**
 * Component used to switch the selected cash account by the user
 *
 * @export
 * @class SwitchCashAccountComponent
 */
@Component({
  selector: "csmobile-switch-cash-account",
  templateUrl: "switch-cash-account.html"
})
export class SwitchCashAccountComponent implements OnInit, OnChanges {
  @Input("cashAccounts") cashAccounts: Array<ICashAccountInterface>;
  @Input("currency") currency: string;

  public numberOfCashAccounts: number = 1;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // Watch the cashAccounts @Input() for available values
    if (changes.cashAccounts.currentValue) {
      this.cashAccounts = changes.cashAccounts.currentValue;
      this.numberOfCashAccounts = this.cashAccounts.length;
    }
  }

  cashAccountChanged() {}
}
