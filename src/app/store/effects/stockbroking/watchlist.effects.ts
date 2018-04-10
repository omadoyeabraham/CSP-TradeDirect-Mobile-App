import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import "rxjs/add/observable/of";

import * as watchlistActions from "../../actions/stockbroking/watchlist.actions";
import { map, switchMap, catchError } from "rxjs/operators";

import { WatchlistProvider } from "../../../stockbrokingModule/providers/watchlist/watchlist";

/**
 * Side effects which are triggered whenever watchlist related actions are dispatched
 */

@Injectable()
export class WatchlistEffects {
  constructor(
    private actions$: Actions,
    private watchlistProvider: WatchlistProvider
  ) {}

  @Effect()
  getWatchList$ = this.actions$.ofType(watchlistActions.LOAD_WATCHLIST).pipe(
    switchMap((action: watchlistActions.loadWatchList) => {
      return this.watchlistProvider
        .getWatchlist(action.payload)
        .pipe(
          map(response => response),
          switchMap(watchlist => [
            new watchlistActions.loadWatchListSuccess(watchlist)
          ]),
          catchError(err => [new watchlistActions.loadWatchListFailure()])
        );
    })
  );
}
