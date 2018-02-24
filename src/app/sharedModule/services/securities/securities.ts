import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import {
  getSecuritiesURL,
  getSelectedSecurityMarketDataURL
} from "../../apiUrls.constants";

/**
 * Provider for all security required services.
 *
 *
 * @export
 * @class SecuritiesProvider
 */
@Injectable()
export class SecuritiesProvider {
  constructor(public http: HttpClient) {}

  /**
   * Get all securities that can be traded on the application
   *
   * @returns Observable(ISecurity[] | error)
   * @memberof SecuritiesProvider
   */
  getSecurities() {
    return this.http
      .get(getSecuritiesURL)
      .pipe(
        map((response: HttpResponse<Object>) => response),
        catchError((err: any) => Observable.throw(err))
      );
  }

  /**
   * Get the market data for a particular security selected
   *
   * @param securityName
   * @returns Observable({} | error)
   * @memberof SecuritiesProvider
   */
  getSelectedSecurityMarketData(securityName = "") {
    return this.http
      .get(getSelectedSecurityMarketDataURL + "/" + securityName)
      .pipe(
        map((response: HttpResponse<Object>) => response),
        catchError((err: any) => Observable.throw(err))
      );
  }
}
