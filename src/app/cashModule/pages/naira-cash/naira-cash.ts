import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";

import { IAppState } from "../../../store/models";
import { ICashAccountInterface } from "../../models/cashAccount.interface";
import {
  getNairaCashAccounts,
  saveActiveNairaCashAccountToStore,
  getActiveNairaCashAccount,
  saveCashAccountCashStatements,
  getSelectedNairaCashAccountCashStatements,
  activeNairaCashStatementsGroupedByDate
} from "../../../store";
import { CashProvider } from "../../provider/cash/cash";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import { ICashStatement } from "../../models/cashStatement.interface";

/**
 * Container component which retrieves naira cash data from the store and passed it to the cashAccountView
 * component for rendering.
 *
 * @type Container component
 * @export
 * @class NairaCashPage
 */
@IonicPage()
@Component({
  selector: "page-naira-cash",
  templateUrl: "naira-cash.html"
})
export class NairaCashPage {
  public nairaCashAccounts: Array<ICashAccountInterface> = [];
  public activeNairaCashAccount: ICashAccountInterface;
  public cashStatements: Array<ICashStatement>;
  public groupedCashStatements: any;
  public cashStatementSummary: any;
  public startDate: string = null;
  public endDate: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public cashProvider: CashProvider,
    public utilityProvider: UtilityProvider
  ) {}

  ionViewDidLoad() {
    // Get all the naira cash accounts from the store
    this.store.select(getNairaCashAccounts).subscribe(cashAccounts => {
      this.nairaCashAccounts = cashAccounts;
    });

    // Get the cash statements for the active naira cash account
    this.store
      .select(getSelectedNairaCashAccountCashStatements)
      .subscribe(cashStatements => {
        this.cashStatements = cashStatements;
      });

    // Get the cash statements for the active naira cash account grouped by date
    this.store
      .select(activeNairaCashStatementsGroupedByDate)
      .subscribe(groupedCashStatements => {
        console.log(groupedCashStatements);
        this.groupedCashStatements = groupedCashStatements;
      });

    // Get the active naira selected cash account from the store
    this.store
      .select(getActiveNairaCashAccount)
      .subscribe(activeNairaCashAccount => {
        this.activeNairaCashAccount = activeNairaCashAccount;

        // Make the api call to get the cash statements for the active cash account
        this.getAndStoreCashStatements(
          this.activeNairaCashAccount,
          this.startDate,
          this.endDate
        );
      });
  }

  /**
   * Called when the switch cash account component emits the cashAccountChanged event.
   * This method dispatches the appropriate action to the redux store when the selected
   * naira cash account is changed.
   *
   * @param {ICashAccountInterface} cashAccount
   * @memberof NairaCashPage
   */
  changeSelectedNairaCashAccount(cashAccount: ICashAccountInterface) {
    // Dispatch the action to save the active naira cash account to the store.
    this.store.dispatch(new saveActiveNairaCashAccountToStore(cashAccount));
  }

  /**
   * Make the API call to get the cash account statements for a cash account,
   * and subsequently save the statements to the redux store.
   *
   * @param {ICashAccountInterface} cashAccount
   * @param {string} [startDate=this.utilityProvider.getDefaultCashStatementStartDate()]
   * @param {string} [endDate=this.utilityProvider.getDefaultCashStatementEndDate()]
   * @memberof CashProvider
   */
  getAndStoreCashStatements(
    cashAccount: ICashAccountInterface,
    startDate: string = this.utilityProvider.getDefaultCashStatementStartDate(),
    endDate: string = this.utilityProvider.getDefaultCashStatementEndDate()
  ) {
    if (cashAccount.name) {
      this.cashProvider
        .getCashAccountStatements(cashAccount.name, startDate, endDate)
        .subscribe(
          response => {
            const responseData = response.body.item;

            /**
             * Either a single object, or an array of objects will be returned.
             * This ensures that we always have an array of objects
             */
            let cashStatements: Array<ICashStatement> =
              responseData.constructor === Array
                ? responseData
                : [responseData];

            // Dispatch the action to update the cash statements for the selected cash account
            this.store.dispatch(
              new saveCashAccountCashStatements({
                cashAccountName: cashAccount.name,
                statements: cashStatements
              })
            );
          },
          err => console.log(err)
        );
    }
  }

  /**
   * Callback called when the filterCashAccountStatements event is emitted from the
   * cash-account-view component
   *
   * @param {any} $event
   * @memberof NairaCashPage
   */
  filterCashAccountStatements($event) {
    this.startDate = $event.startDate;
    this.endDate = $event.endDate;

    this.getAndStoreCashStatements(
      this.activeNairaCashAccount,
      $event.startDate,
      $event.endDate
    );
  }
}
