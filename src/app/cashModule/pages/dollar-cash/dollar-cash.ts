import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { Store } from "@ngrx/store";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";

import { IAppState } from "../../../store/models";
import { ICashAccountInterface } from "../../models/cashAccount.interface";
import {
  dollarCashAccounts,
  saveActiveDollarCashAccountToStore,
  getActiveDollarCashAccount,
  saveCashAccountCashStatements,
  getCashAccountStatementsEntities,
  cashStatementsByAccountName,
  groupedCashStatements
} from "../../../store";
import { CashProvider } from "../../provider/cash/cash";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import { ICashStatement } from "../../models/cashStatement.interface";

/**
 * Container component which retrieves dollar cash data from the store and passed it to the cashAccountView
 * component for rendering.
 *
 * @type Container component
 * @export
 * @class DollarCashPage
 */
@IonicPage()
@Component({
  selector: "page-dollar-cash",
  templateUrl: "dollar-cash.html"
})
export class DollarCashPage {
  public dollarCashAccounts: Array<ICashAccountInterface> = [];
  public activeDollarCashAccount: ICashAccountInterface;
  public cashStatements: Array<ICashStatement>;
  public groupedCashStatements: any;
  public cashStatementSummary: any;
  public startDate: string = null;
  public endDate: string = null;
  public filterCashStatementsLoader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public cashProvider: CashProvider,
    public utilityProvider: UtilityProvider,
    public loadingCtrl: LoadingController
  ) {
    this.startDate = this.utilityProvider.getDefaultCashStatementStartDate();
    this.endDate = this.utilityProvider.getDefaultCashStatementEndDate();
  }

  ionViewDidLoad() {
    this.selectCashAccountsFromStore();
    this.getCashStatementsForAllCashAccounts();
    this.selectActiveCashAccount();
    this.getGroupedCashStatements();
    this.getCashStatements();
    this.getCashStatementsSummary();
  }

  /**
   * Select all dollar cash accounts from the store
   *
   * @memberof dollarCashPage
   */
  selectCashAccountsFromStore() {
    this.store.select(dollarCashAccounts).subscribe(cashAccounts => {
      console.log(cashAccounts)
      this.dollarCashAccounts = cashAccounts;
    });
  }

  /**
   * Get the cash statements for all cash accounts and dispatch the actions to keep them in the store
   *
   * @memberof dollarCashPage
   */
  getCashStatementsForAllCashAccounts() {
    this.dollarCashAccounts.forEach(cashAccount => {
      this.getAndStoreCashStatements(cashAccount, this.startDate, this.endDate);
    });
  }

  /**
   * Get the active cash account, and also make the call to renew its cash statements data
   *
   * @memberof dollarCashPage
   */
  selectActiveCashAccount() {
    this.store
      .select(getActiveDollarCashAccount)
      .subscribe(activeDollarCashAccount => {
        this.activeDollarCashAccount = activeDollarCashAccount;

        // Make the api call to get the cash statements for the active cash account
        this.getAndStoreCashStatements(
          this.activeDollarCashAccount,
          this.startDate,
          this.endDate
        );
      });
  }

  /**
   * Get the cash statements (grouped by date) for the active cash account
   *
   * @memberof dollarCashPage
   */
  getGroupedCashStatements() {
    this.store
      .select(groupedCashStatements(this.activeDollarCashAccount.name))
      .subscribe(groupedCashStatements => {
        this.groupedCashStatements = groupedCashStatements;
      });
  }

  /**
   * Get the cash Statements for the active account
   *
   * @memberof dollarCashPage
   */
  getCashStatements() {
    if (!this.activeDollarCashAccount) {
      return;
    }
    this.store
      .select(cashStatementsByAccountName(this.activeDollarCashAccount.name))
      .subscribe(cashStatements => {
        this.cashStatements = cashStatements;
      });
  }

  /**
   * Get the summary report for the current cash account reports
   *
   * @memberof dollarCashPage
   */
  getCashStatementsSummary() {
    this.cashStatementSummary = this.cashProvider.calculateCashStatementSummary(
      this.cashStatements,
      this.startDate,
      this.endDate
    );
  }

  /**
   * Called when the switch cash account component emits the cashAccountChanged event.
   * This method dispatches the appropriate action to the redux store when the selected
   * dollar cash account is changed.
   *
   * @param {ICashAccountInterface} cashAccount
   * @memberof dollarCashPage
   */
  changeSelectedDollarCashAccount(cashAccount: ICashAccountInterface) {
    // Dispatch the action to save the active dollar cash account to the store.
    this.store.dispatch(new saveActiveDollarCashAccountToStore(cashAccount));

    // Make the api call to get the cash statements for the new active cash account
    this.getAndStoreCashStatements(cashAccount, this.startDate, this.endDate);

    this.getCashStatements();
    this.getCashStatementsSummary();
    this.getGroupedCashStatements();
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
      // Show loader while asynchronous data operation occurs
      // this.presentFilterCashStatementsLoader();

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

            // Get the cash statements after filtering by date range
            this.getCashStatements();

            // Refresh the grouped cash statements to be displayed by the cash-account-view component
            this.getGroupedCashStatements();

            // Recalculate the summary of the loaded cash statements to be displayed
            this.getCashStatementsSummary();

            // Hide loader
            // if (this.filterCashStatementsLoader) {
            //   this.filterCashStatementsLoader.dismiss();
            //   this.filterCashStatementsLoader = null;
            // }
          },
          err => {
            // Hide loader
            // if (this.filterCashStatementsLoader) {
            //   this.filterCashStatementsLoader.dismiss();
            //   this.filterCashStatementsLoader = null;
            // }

            // Show error toast
            this.utilityProvider.presentToast(
              "Unable to get cash statements. Please try again",
              "toastError"
            );
            console.log(err);
          }
        );
    }
  }

  /**
   * Callback called when the filterCashAccountStatements event is emitted from the
   * cash-account-view component
   *
   * @param {any} $event
   * @memberof dollarCashPage
   */
  filterCashAccountStatements($event) {
    this.startDate = $event.startDate;
    this.endDate = $event.endDate;

    this.getAndStoreCashStatements(
      this.activeDollarCashAccount,
      $event.startDate,
      $event.endDate
    );
  }

  /**
   * Create the filter cash statements to be presented when the user is searching for cash statements
   *
   * @memberof dollarCashPage
   */
  presentFilterCashStatementsLoader(): void {
    this.filterCashStatementsLoader = this.loadingCtrl.create({
      content: "Getting Cash Account Statements..."
    });

    this.filterCashStatementsLoader.present();
  }
}
