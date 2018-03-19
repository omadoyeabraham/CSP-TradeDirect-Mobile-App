import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IWatchListState } from "../../models";

export const watchListState = createFeatureSelector<IWatchListState>(
  "watchList"
);

export const userWatchList = createSelector(
  watchListState,
  (state: IWatchListState) => {
    return state.watchlist;
  }
);

export const watchListLoaded = createSelector(
  watchListState,
  (state: IWatchListState) => {
    return state.loaded;
  }
);

export const watchListLoading = createSelector(
  watchListState,
  (state: IWatchListState) => {
    return state.loading;
  }
);
