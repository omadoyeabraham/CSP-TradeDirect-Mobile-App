import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { GetWatchListURL } from "../../../sharedModule/apiUrls.constants";

/**
 * Provider for services related to watchlists
 *
 * @export
 * @class WatchlistProvider
 */
@Injectable()
export class WatchlistProvider {
  constructor(public http: HttpClient) {}

  /**
   * Get the user's watchlist
   *
   * @param {any} userID
   * @returns
   * @memberof WatchlistProvider
   */
  getWatchlist(userID) {
    return this.http
      .get(`${GetWatchListURL}\${userID}`)
      .pipe(catchError(err => Observable.throw(err)));
  }

  createWatchlistItem() {}

  editWatchlistItem() {}

  deleteWatchlistItem() {}

  toggleWatchlistItem() {}
}
