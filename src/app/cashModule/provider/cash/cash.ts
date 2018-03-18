import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";

import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import { getCashAccountStatementsURL } from "../../../sharedModule/apiUrls.constants";
import { ICashStatement } from "../../models/cashStatement.interface";
import { saveCashAccountCashStatements } from "../../../store";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import { ICashAccountInterface } from "../../models/cashAccount.interface";

/**
 * Provider for the cash account module
 *
 * @export
 * @class CashProvider
 */
@Injectable()
export class CashProvider {
  constructor(
    public http: HttpClient,
    public utilityProvider: UtilityProvider,
    public store: Store<IAppState>
  ) {}

  /**
   * Get the cash account statements for a cash account
   *
   * @param {any} cashAccountID
   * @param {any} [startDate=this.utilityProvider.getDefaultCashStatementStartDate()]
   * @param {any} [endDate=this.utilityProvider.getDefaultCashStatementEndDate()]
   * @memberof CashProvider
   */
  getCashAccountStatements(
    cashAccountID,
    startDate = this.utilityProvider.getDefaultCashStatementStartDate(),
    endDate = this.utilityProvider.getDefaultCashStatementEndDate()
  ) {
    return this.http
      .post(
        getCashAccountStatementsURL,
        {
          accountNumber: cashAccountID,
          startDate,
          endDate
        },
        { observe: "response" }
      )
      .pipe(
        map((response: HttpResponse<Object>) => response),
        catchError(err => Observable.throw(err))
      );
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
  // getAndStoreCashStatements(
  //   cashAccount: ICashAccountInterface,
  //   startDate: string = this.utilityProvider.getDefaultCashStatementStartDate(),
  //   endDate: string = this.utilityProvider.getDefaultCashStatementEndDate()
  // ) {
  //   if (cashAccount.name) {
  //     this.getCashAccountStatements(
  //       cashAccount.name,
  //       startDate,
  //       endDate
  //     ).subscribe(
  //       response => {
  //         const responseData = response.body.item;

  //         /**
  //          * Either a single object, or an array of objects will be returned.
  //          * This ensures that we always have an array of objects
  //          */
  //         let cashStatements: Array<ICashStatement> =
  //           responseData.constructor === Array ? responseData : [responseData];

  //         // Dispatch the action to update the cash statements for the selected cash account
  //         this.store.dispatch(
  //           new saveCashAccountCashStatements({
  //             cashAccountName: cashAccount.name,
  //             statements: cashStatements
  //           })
  //         );
  //       },
  //       err => console.log(err)
  //     );
  //   }
  // }

  /**
   *
   * Return all uncleared effects in the array of cash statements passed in, based on the date constraints
   *
   * Uncleared effects are transactions that have a value date greater than the endDate in
   * the current search range. I.E. as at the endDate of the search these transactions had not yet settled (T+3) and are hence uncleared
   *
   * @param {Array<ICashStatement>} cashStatements
   * @param {any} startDate
   * @param {any} endDate
   * @returns
   * @memberof NairaCashPage
   */
  getUnclearedEffects(
    cashStatements: Array<ICashStatement>,
    startDate,
    endDate
  ) {
    let unclearedAmount = 0;

    let unclearedEffects = cashStatements.filter(cashStatement => {
      let valueDate = moment(cashStatement.valueDate, "YYYY-MM-DD");
      let searchEndDate = moment(endDate, "YYYY-MM-DD");

      if (searchEndDate.isBefore(valueDate)) {
        unclearedAmount =
          parseFloat(cashStatement.debitAmount) === 0.0
            ? parseFloat(cashStatement.creditAmount)
            : parseFloat(cashStatement.debitAmount);
        cashStatement.unclearedAmount = unclearedAmount;
      }

      return searchEndDate.isBefore(valueDate);
    });

    return unclearedEffects;
  }

  /**
   * Calculate the cash statement summary for the array of cash statements passed in.
   *
   * @param {Array<ICashStatement>} cashStatements
   * @param {any} startDate
   * @param {any} endDate
   * @returns
   * @memberof CashProvider
   */
  calculateCashStatementSummary(
    cashStatements: Array<ICashStatement>,
    startDate,
    endDate
  ) {
    let openingStatement = cashStatements[0];
    let closingStatement = cashStatements[cashStatements.length - 1];

    let openingBalance = 0;
    let totalDebitAmount = 0;
    let totalCreditAmount = 0;
    let closingBalance = 0;
    let unclearedEffects = 0;
    let cashAvailable = 0;

    // On intial Load, the cashStatement is not set, catch this and return []
    if (openingStatement === undefined) {
      return [];
    }

    /**
     * Calculating the opening balance
     *  - If there is a debit entry in the statement, add it to the current balance to get the opening balance. This is because the debited amount has been debited (taken out) of the opening balance to
     * arrive at the current balance
     *  - Else subtract the creditAmount (amount added to the initial balance) from the current balance to get the initial balance
     */
    if (parseFloat(openingStatement.debitAmount) > 0) {
      openingBalance =
        parseFloat(openingStatement.balance) +
        parseFloat(openingStatement.debitAmount);
    } else {
      openingBalance =
        parseFloat(openingStatement.balance) -
        parseFloat(openingStatement.creditAmount);
    }

    // calculating the total amount debited
    cashStatements.forEach(cashStatement => {
      totalDebitAmount += parseFloat(cashStatement.debitAmount);
    });

    // calculating the total amount credited
    cashStatements.forEach(cashStatement => {
      totalCreditAmount += parseFloat(cashStatement.creditAmount);
    });

    // Closing Balance
    closingBalance = parseFloat(closingStatement.balance);

    // UnclearedEffects and unclearedBalance
    // STOPPED HERE
    this.getUnclearedEffects(cashStatements, startDate, endDate).forEach(
      unclearedEffect => {
        unclearedEffects += parseFloat(unclearedEffect.creditAmount);
      }
    );

    // Cash Available = Most recent balance - uncleared balance (i.e uncleared effects)
    cashAvailable = parseFloat(closingStatement.balance) - unclearedEffects;

    return {
      openingBalance,
      totalDebitAmount,
      totalCreditAmount,
      closingBalance,
      unclearedEffects,
      cashAvailable
    };
  }
}
