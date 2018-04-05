import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Slides } from "ionic-angular";

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
  // Expose the slides in the slider to the class for tracking and appropriate update
  @ViewChild(Slides) slides: Slides;
  @Input("cashAccounts") cashAccounts: Array<ICashAccountInterface>;
  @Input("currency") currency: string = "₦";
  @Output() cashAccountSelected = new EventEmitter<ICashAccountInterface>();

  public numberOfCashAccounts: number = 1;
  public activeSlideIndex: number = 1;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // Watch the cashAccounts @Input() for available values
    if (changes.cashAccounts.currentValue) {
      this.cashAccounts = changes.cashAccounts.currentValue;
      this.numberOfCashAccounts = this.cashAccounts.length;
    }
  }

  /**
   * Called when the ionSlideDidChange event is emitted by the ion-slides in the components HTML
   *
   * @memberof SwitchCashAccountComponent
   */
  cashAccountChanged() {
    // Get the active slide index
    let cashAccountIndex = this.slides.getActiveIndex();
    let numberOfSlides = this.slides.length();

    // Check to ensure that when the slider overshoots it's index, we revert back to the last index
    if (cashAccountIndex === numberOfSlides) {
      cashAccountIndex = cashAccountIndex - 1;
    }

    // Show the activeIndex + 1 in the template, because it's zero indexed
    this.activeSlideIndex = cashAccountIndex + 1;

    /**
     * Set the active cash account, based on the index of the slider that the user slid to.
     * Also account for edge cases by reverting to the last cash Account when the user tries to
     * slide past the allowable index
     */
    const nextActiveCashAccount = this.cashAccounts[cashAccountIndex];

    // Emit the @Output() to instruct the parent component to dispatch the action to emit to the store
    this.cashAccountSelected.emit(nextActiveCashAccount);
  }
}
