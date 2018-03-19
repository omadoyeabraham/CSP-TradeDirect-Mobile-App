import { Action } from "@ngrx/store";
import { IWatchlistItem } from "../../models/watchListItem.interface";

export const LOAD_WATCHLIST = "[WATCHLIST] Get the user's watchlist";
export const LOAD_WATCHLIST_SUCCESS =
  "[WATCHLIST] The user's watchlist was loaded successfully";
export const LOAD_WATCHLIST_FAILURE =
  "[WATCHLIST] The user's watchlist failed to load";

export class loadWatchList implements Action {
  readonly type = LOAD_WATCHLIST;
  constructor(public payload: number) {}
}

export class loadWatchListSuccess implements Action {
  readonly type = LOAD_WATCHLIST_SUCCESS;
  constructor(public payload: Array<IWatchlistItem>) {}
}

export class loadWatchListFailure implements Action {
  readonly type = LOAD_WATCHLIST_FAILURE;
  constructor() {}
}

export type WatchlistActionTypes =
  | loadWatchList
  | loadWatchListSuccess
  | loadWatchListFailure;
