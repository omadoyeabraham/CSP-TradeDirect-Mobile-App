import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { ITradeOrderTerm } from "../../models/tradeOrderTerm.interface";
import {
  getActiveTradeOrderTermsURL,
  previewTradeOrderURL
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
}
