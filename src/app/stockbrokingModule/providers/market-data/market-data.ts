import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { getMarketDataURL } from "../../../sharedModule/apiUrls.constants";

/**
 * Injectable service which handles market data related API tasks
 *
 * @export
 * @class MarketDataProvider
 */
@Injectable()
export class MarketDataProvider {
  constructor(public http: HttpClient) {}

  /**
   * Get the market data for all stocks from the NSE
   *
   * @returns
   * @memberof MarketDataProvider
   */
  public getMarketData() {
    return this.http
      .get(getMarketDataURL)
      .pipe(catchError(err => Observable.throw(err)));
  }
}
