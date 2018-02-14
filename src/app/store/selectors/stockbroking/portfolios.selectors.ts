import { createFeatureSelector } from "@ngrx/store";
import {
  IStockBrokingPortfolioState,
  IStbActivePortfolioMetaData
} from "../../models";
import { createSelector } from "@ngrx/store";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";
import { IPortfolioHolding } from "../../../stockbrokingModule/models/portfolioHolding.interface";

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

/**
 * Get the portfolio holdings for the active portfolio
 */
export const getAllActivePortfolioHoldings = createSelector(
  getActivePortfolio,
  (state: IPortfolio) => {
    return state.portfolioHoldings;
  }
);

/**
 * Get the stock portfolio holdings for the active portfolio
 */
export const getActivePortfolioStockHoldings = createSelector(
  getAllActivePortfolioHoldings,
  (state: IPortfolioHolding[]) => {
    // Filter to pick only equity stock
    console.log(state);
    return state.filter(holding => holding.securityType === "EQUITY");
  }
);

/**
 * Get the bond portfolio holdings for the active portfolio
 */
export const getActivePortfolioBondHoldings = createSelector(
  getAllActivePortfolioHoldings,
  (state: IPortfolioHolding[]) => {
    // Filter to pick only equity stock
    return state.filter(holding => holding.securityType === "BOND");
  }
);

/**
 * Get the stock holdings data transformed to suit graph plotting
 */
export const getActivePortfolioStockHoldingsGraphData = createSelector(
  getActivePortfolio,
  getActivePortfolioStockHoldings,
  (activePortfolio: IPortfolio, stockHoldings: IPortfolioHolding[]) => {
    // Obtain the total value of the portfolio
    let totalPortfolioValue = stockHoldings.reduce((total, holding) => {
      return total + parseFloat(holding.valuation);
    }, 0);

    let stockData = [];

    // Get the stock data transformed to suit graph plotting
    stockHoldings.forEach((holding: IPortfolioHolding) => {
      // get the stock's performance, value, and % of the portfolio
      let stockValue = parseFloat(holding.valuation);
      let stockPerformance = parseFloat(holding.percentGain);

      let percentageOfPortfolio = (
        stockValue /
        totalPortfolioValue *
        100
      ).toFixed(2);

      // Because highcharts requires this structure to draw pie charts
      stockData.push({
        name: holding.securityName,
        y: stockValue,
        percentageOfPortfolio: percentageOfPortfolio,
        percentageGain: stockPerformance
      });
    });

    let others = {
      name: "others",
      y: 0,
      percentageOfPortfolio: 0,
      percentageGain: 0
    };

    // Add all stocks that make up less than 5% of the to an 'others' section instead
    stockData = stockData.filter((stock, index) => {
      if (stock.percentageOfPortfolio < 5.0) {
        others.y += stock.y;
        others.percentageOfPortfolio += parseFloat(stock.percentageOfPortfolio);
        others.percentageGain += parseFloat(stock.percentageGain);
        return false;
      } else {
        return true;
      }
    });

    // Only add others if there are actually others to add
    if (others.y !== 0) {
      stockData.push(others);
    }

    return stockData;
  }
);
