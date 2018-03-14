import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../store/models";
import { ICashAccountInterface } from "../../models/cashAccount.interface";
import {
  getNairaCashAccounts,
  saveActiveNairaCashAccountToStore,
  getActiveNairaCashAccount
} from "../../../store";
import { CashProvider } from "../../provider/cash/cash";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
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

    // Get the active naira selected cash account from the store
    this.store
      .select(getActiveNairaCashAccount)
      .subscribe(activeNairaCashAccount => {
        this.activeNairaCashAccount = activeNairaCashAccount;

        // Make the api call to get the cash statements for the active cash account
        const cashAccountID = this.activeNairaCashAccount.name;
        this.getNairaCashStatements(cashAccountID);
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
   * Get the naira cash statements for a selected naira cash account
   *
   * @param {number} cashAccountID
   * @param {string} [startDate=this.utilityProvider.getDefaultCashStatementStartDate()]
   * @param {string} [endDate=this.utilityProvider.getDefaultCashStatementEndDate()]
   * @memberof NairaCashPage
   */
  getNairaCashStatements(
    cashAccountID: string,
    startDate: string = this.utilityProvider.getDefaultCashStatementStartDate(),
    endDate: string = this.utilityProvider.getDefaultCashStatementEndDate()
  ) {
    if (cashAccountID) {
      this.cashProvider
        .getCashAccountStatements(cashAccountID, startDate, endDate)
        .subscribe(
          response => {
            console.log(response);
            const responseData = response.body.item;

            /**
             * Either a single object, or an array of objects will be returned.
             * This ensures that we always have an array of objects
             */
            let cashStatements: Array<ICashStatement> =
              responseData.constructor === Array
                ? responseData
                : [responseData];
            console.log(cashStatements);
          },
          err => console.log(err)
        );
    }
  }
}
