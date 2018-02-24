import { createFeatureSelector } from "@ngrx/store";
import * as moment from "moment";

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

/**
 * Get an array containing the name of all stocks owned by the user, regardless of portfolio
 */
export const getAllPortfolioHoldings=createSelector(
  getStbPortfolios,
  (state: IPortfolio[]) => {
    let uniqueStockHoldings: Array<any> = [];

    // Get all holdings, in all portfolios
    state.forEach((portfolio: IPortfolio) => {
      portfolio.portfolioHoldings.forEach((holding: IPortfolioHolding) => {
        uniqueStockHoldings.push(holding.securityName);
      })
    })
    
    // Ensure that the array contains only unique values using ES6's Set
    uniqueStockHoldings = Array.from(new Set(uniqueStockHoldings))

    return uniqueStockHoldings
  }
)

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
    return state.filter(holding => holding.securityType === "EQUITY");
  }
);

/**
 * Get the bond portfolio holdings for the active portfolio
 */
export const getActivePortfolioBondHoldings = createSelector(
  getAllActivePortfolioHoldings,
  (state: IPortfolioHolding[]) => {
    // Filter to pick only bonds
    return state.filter(holding => holding.securityType === "BOND");
  }
);

/**
 * Private function which calculates some metadata (faceValue etc) for all bond holdings
 * @param bondPortfolioHoldings
 */
export const _getActivePortfolioBondHoldingsWithMetaData = (
  bondPortfolioHoldings: IPortfolioHolding[]
) => {
  // Data initialization
  let faceValue = 0;
  let accruedCoupon = 0;
  let currentPortfolioBondHoldings = [];

  // Loop through the bond holding, and perform the necessary calculations
  bondPortfolioHoldings.forEach((bondHolding, index) => {
    faceValue = parseFloat(bondHolding.marketValue);
    accruedCoupon =
      (parseFloat(bondHolding.dirtyPrice) -
        parseFloat(bondHolding.marketPrice)) *
      parseFloat(bondHolding.quantityHeld);

    bondHolding.id = index;
    bondHolding.faceValue = faceValue;
    bondHolding.accruedCoupon = accruedCoupon;
    let nextCouponDate = moment(bondHolding.lastCouponDate).add(90, "days");
    bondHolding.nextCouponDate = nextCouponDate;

    currentPortfolioBondHoldings.push(bondHolding);
  });

  return currentPortfolioBondHoldings;
};

/**
 * Get the bond portfolio holdings for the active portfolio plus some calculated metadata
 */
export const getActivePortfolioBondHoldingsWithMetaData = createSelector(
  getActivePortfolioBondHoldings,
  _getActivePortfolioBondHoldingsWithMetaData
);

/**
 * Private function used to calculate the data used for plotting STB portfolio holdings graphs
 */
export const _getActivePortfolioStockHoldingsGraphData = (
  activePortfolio: IPortfolio,
  stockHoldings: IPortfolioHolding[]
) => {
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
};

/**
 * Get the stock holdings data transformed to suit graph plotting
 */
export const getActivePortfolioStockHoldingsGraphData = createSelector(
  getActivePortfolio,
  getActivePortfolioStockHoldings,
  _getActivePortfolioStockHoldingsGraphData
);

/**
 * Private function used to calculate the data used for plotting bond portfolio holdings graphs
 *
 * @param activePortfolio
 * @param bondHoldings
 */
export const _getActivePortfolioBondHoldingsGraphData = (
  activePortfolio: IPortfolio,
  bondHoldings: IPortfolioHolding[]
) => {
  let bondData = [];
  let bondValue = 0;
  let bondPerformance = 0;
  let totalPortfolioValue = 0;

  // Obtain the total value of the portfolio
  bondHoldings.forEach(portfolioHolding => {
    totalPortfolioValue += parseFloat(portfolioHolding.valuation);
  });

  bondHoldings.forEach(portfolioHolding => {
    // get the stock's performance, value, and % of the portfolio
    bondValue = parseFloat(portfolioHolding.valuation);
    bondPerformance = parseFloat(portfolioHolding.percentGain);

    let percentageOfPortfolio = (bondValue / totalPortfolioValue * 100).toFixed(
      2
    );
    // Because highcharts requires this structure to draw pie charts
    bondData.push({
      name: portfolioHolding.securityName,
      y: bondValue,
      percentageOfPortfolio: percentageOfPortfolio,
      percentageGain: bondPerformance
    });
  });

  return bondData;
};

/**
 * Get the bond holdings data transformed to suit graph plotting
 */
export const getActivePortfolioBondHoldingsGraphData = createSelector(
  getActivePortfolio,
  getActivePortfolioBondHoldings,
  _getActivePortfolioBondHoldingsGraphData
);


