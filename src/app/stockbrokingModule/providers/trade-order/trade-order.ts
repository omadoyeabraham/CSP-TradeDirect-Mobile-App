import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { ITradeOrderTerm } from "../../models/tradeOrderTerm.interface";
import {
  getActiveTradeOrderTermsURL,
  previewTradeOrderURL,
  executeTradeOrderURL,
  getTradeOrdersURL
} from "../../../sharedModule/apiUrls.constants";
import { map, catchError, retry } from "rxjs/operators";
import { ITradeOrder } from "../../models";

/**
 * Provider for TradeOrders
 *
 * @export
 * @class TradeOrderProvider
 */
@Injectable()
export class TradeOrderProvider {
  constructor(public http: HttpClient) {}

  /**
   * Get all the active trade order terms available
   *
   * @returns {Observable<ITradeOrderTerm[]>}
   * @memberof TradeOrderProvider
   */
  getTradeOrderTerms(): Observable<ITradeOrderTerm[]> {
    return this.http
      .get(getActiveTradeOrderTermsURL)
      .pipe(
        map((response: any) => response.item),
        catchError(err => Observable.throw(err))
      );
  }

  /**
   * Preview a trade order and get the trade order total
   *
   * @param {ITradeOrder} tradeOrder
   * @returns
   * @memberof TradeOrderProvider
   */
  previewTradeOrder(tradeOrder: ITradeOrder) {
    return this.http
      .post(previewTradeOrderURL, tradeOrder, { observe: "response" })
      .pipe(retry(2), catchError(err => Observable.throw(err)));
  }

  /**
   * Execute a trade order
   *
   * @param {ITradeOrder} tradeOrder
   * @returns
   * @memberof TradeOrderProvider
   */
  executeTradeOrder(tradeOrder: ITradeOrder) {
    return this.http
      .post(executeTradeOrderURL, tradeOrder, { observe: "response" })
      .pipe(retry(2), catchError(err => Observable.throw(err)));
  }

  /**
   * Get the trade order history for the user
   *
   * @param {number} userID
   * @param {number} [cacheStatus=0]
   * @returns
   * @memberof TradeOrderProvider
   */
  getTradeOrderHistory(userID: number, cacheStatus: number = 0) {
    return this.http
      .get(getTradeOrdersURL + `/${userID}/${cacheStatus}`)
      .pipe(catchError(err => Observable.throw(err)));
  }
}
