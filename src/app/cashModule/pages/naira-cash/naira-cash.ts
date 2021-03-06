import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../store/models";
import { ICashAccountInterface } from "../../models/cashAccount.interface";
import {
  nairaCashAccounts,
  saveActiveNairaCashAccountToStore,
  getActiveNairaCashAccount,
  saveCashAccountCashStatements,
  cashStatementsByAccountName,
  groupedCashStatements
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
   * Select all naira cash accounts from the store
   *
   * @memberof NairaCashPage
   */
  selectCashAccountsFromStore() {
    this.store.select(nairaCashAccounts).subscribe(cashAccounts => {
      this.nairaCashAccounts = cashAccounts;
    });
  }

  /**
   * Get the cash statements for all cash accounts and dispatch the actions to keep them in the store
   *
   * @memberof NairaCashPage
   */
  getCashStatementsForAllCashAccounts() {
    this.nairaCashAccounts.forEach(cashAccount => {
      this.getAndStoreCashStatements(cashAccount, this.startDate, this.endDate);
    });
  }

  /**
   * Get the active cash account, and also make the call to renew its cash statements data
   *
   * @memberof NairaCashPage
   */
  selectActiveCashAccount() {
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
   * Get the cash statements (grouped by date) for the active cash account
   *
   * @memberof NairaCashPage
   */
  getGroupedCashStatements() {
    this.store
      .select(groupedCashStatements(this.activeNairaCashAccount.name))
      .subscribe(groupedCashStatements => {
        this.groupedCashStatements = groupedCashStatements;
      });
  }

  /**
   * Get the cash Statements for the active account
   *
   * @memberof NairaCashPage
   */
  getCashStatements() {
    if (!this.activeNairaCashAccount) {
      return;
    }
    this.store
      .select(cashStatementsByAccountName(this.activeNairaCashAccount.name))
      .subscribe(cashStatements => {
        this.cashStatements = cashStatements;
      });
  }

  /**
   * Get the summary report for the current cash account reports
   *
   * @memberof NairaCashPage
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
   * naira cash account is changed.
   *
   * @param {ICashAccountInterface} cashAccount
   * @memberof NairaCashPage
   */
  changeSelectedNairaCashAccount(cashAccount: ICashAccountInterface) {
    // Dispatch the action to save the active naira cash account to the store.
    this.store.dispatch(new saveActiveNairaCashAccountToStore(cashAccount));

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

  /**
   * Create the filter cash statements to be presented when the user is searching for cash statements
   *
   * @memberof NairaCashPage
   */
  presentFilterCashStatementsLoader(): void {
    this.filterCashStatementsLoader = this.loadingCtrl.create({
      content: "Getting Cash Account Statements..."
    });

    this.filterCashStatementsLoader.present();
  }
}
