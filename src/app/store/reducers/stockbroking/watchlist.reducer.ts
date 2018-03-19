import { IWatchListState } from "../../models";
import * as watchListActions from "../../actions/stockbroking/watchlist.actions";

export default function watchlistReducer(
  state: IWatchListState,
  action: watchListActions.WatchlistActionTypes
): IWatchListState {
  switch (action.type) {
    case watchListActions.LOAD_WATCHLIST:
      return {
        ...state,
        loading: true
      };

    case watchListActions.LOAD_WATCHLIST_SUCCESS:
      return {
        watchlist: action.payload,
        loaded: true,
        loading: false
      };

    case watchListActions.LOAD_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false
      };

    default:
      return state;
  }
}
