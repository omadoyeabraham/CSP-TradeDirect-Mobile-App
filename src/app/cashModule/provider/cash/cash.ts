import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, retry } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import { getCashAccountStatementsURL } from "../../../sharedModule/apiUrls.constants";

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
    public utilityProvider: UtilityProvider
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
      .pipe(retry(3), catchError(err => Observable.throw(err)));
  }
}
