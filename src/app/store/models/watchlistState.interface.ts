import { IWatchlistItem } from "./watchListItem.interface";

export interface IWatchListState {
  watchlist: Array<IWatchlistItem>;
  loading: boolean;
  loaded: boolean;
}
