import { createFeatureSelector } from "@ngrx/store";
import { IStockBrokingPortfolioState } from "../../models";
import { createSelector } from "@ngrx/store";

/**
 * Selectors are pure functions (fns that do not mutate any variable, data or state outside their lexical scope) which take a slice of state as input and return some state data (possibly formatted) that we can return to components
 */

/**
 * createFeatureSelector returns a selector fn that looks up and returns the specified feature state. In this case the selector returned by getStbPortfoliosState will return the stbPortfolios slice of state which has the shape of IAuthStateIStockBrokingPortfolioState
 */
export const getStbPortfoliosState = createFeatureSelector<
  IStockBrokingPortfolioState
>("stbPortfolios");

// Get the number of stb portfolios owned by the user
export const getNumberOfStbPortfolios = createSelector(
  getStbPortfoliosState,
  (state: IStockBrokingPortfolioState) => {
    return Object.keys(state).length;
  }
);
