import { createFeatureSelector } from "@ngrx/store";
import {
  IStockBrokingPortfolioState,
  IStbActivePortfolioMetaData
} from "../../models";
import { createSelector } from "@ngrx/store";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";

/**
 * Selectors are pure functions (fns that do not mutate any variable, data or state outside their lexical scope) which take a slice of state as input and return some state data (possibly formatted) that we can return to components
 */

/**
 * createFeatureSelector returns a selector fn that looks up and returns the specified feature state. In this case the selector returned by getStbPortfoliosState will return the stbPortfolios slice of state which has the shape of IAuthStateIStockBrokingPortfolioState
 */
export const getStbPortfoliosEntities = createFeatureSelector<
  IStockBrokingPortfolioState
>("stbPortfolios");

// Get the stb portfolios owned by the user as an ARRAY
export const getStbPortfolios = createSelector(
  getStbPortfoliosEntities,
  (state: IStockBrokingPortfolioState) => {
    return Object.keys(state).map(id => state[id]);
  }
);

// Get the number of stb portfolios owned by the user
export const getNumberOfStbPortfolios = createSelector(
  getStbPortfoliosEntities,
  (state: IStockBrokingPortfolioState) => {
    return Object.keys(state).length;
  }
);

// Get the stbActivePortfolio feature state slice
export const getActivePortfolio = createFeatureSelector<IPortfolio>(
  "stbActivePortfolio"
);

// Get the stbActivePortfolioMetaData feature state slice
export const getActivePortfolioMetaData = createFeatureSelector<
  IStbActivePortfolioMetaData
>("stbActivePortfolioMetaData");
