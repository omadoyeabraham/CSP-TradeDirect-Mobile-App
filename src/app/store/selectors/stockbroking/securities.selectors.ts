import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as moment from "moment";

import { ISecurity } from "../../../stockbrokingModule/models";

/**
 * Feature selector used to select the "stbSecurities slice of state"
 */
export const getStbSecurities = createFeatureSelector<Array<ISecurity>>(
  "stbSecurities"
);

/**
 * Feature selector used to select the "selectedSecurityOnOverviewPage slice of state"
 */
export const getSelectedSecurityOnOverviewPage = createFeatureSelector<
  ISecurity
>("stbSelectedSecurityOnOverviewPage");

/**
 * Feature selector used to select the "selectedSecurityOnOverviewPageMarketData slice of state"
 */
export const getSelectedSecurityMarketData = createFeatureSelector<Object>(
  "stbSelectedSecurityMarketData"
);

/**
 * Selector used to get the prive movement graph data for the selected security
 */
export const getSelectedSecurityPriceMovements = createSelector(
  getSelectedSecurityMarketData,
  (state: any) => {
    const chartData = state.trades ? state.trades : null;

    if (!chartData || chartData.length === 0) {
      return null;
    }

    let priceMovements = chartData.map((data, index) => {
      return {
        id: ++index,
        date: moment(data.time).format("HH:mm:ss"),
        price: data.tradePrice,
        qty: data.tradeSize
      };
    });

    // So the graph is plotted in the correct order
    priceMovements.reverse();

    return priceMovements;
  }
);

/**
 * Get the selected securitie's bids
 */
export const getSelectedSecurityBids = createSelector(
  getSelectedSecurityMarketData,
  (state: any) => {
    let marketSnapShot = state;

    // Calculating bids
    let bidLevels =
      marketSnapShot && marketSnapShot.bidLevels
        ? marketSnapShot.bidLevels
        : [];
    let bids = [];
    let bidsTotal = 0;

    bidLevels.forEach((bidLevel, index) => {
      bidLevel.id = ++index;
      bidLevel.total = bidsTotal + parseFloat(bidLevel.qty);
      bidsTotal = bidLevel.total;
      bids.push(bidLevel);
    });

    return bids;
  }
);

/**
 * Get the selected securities' offers
 */
export const getSelectedSecurityOffers = createSelector(
  getSelectedSecurityMarketData,
  (state: any) => {
    let marketSnapShot = state;

    // Calculating offers
    let offerLevels =
      marketSnapShot && marketSnapShot.offerLevels
        ? marketSnapShot.offerLevels
        : [];
    let offers = [];
    let offersTotal = 0;

    offerLevels.forEach((offerLevel, index) => {
      offerLevel.id = ++index;
      offerLevel.total = offersTotal + parseFloat(offerLevel.qty);
      offersTotal = offerLevel.total;
      offers.push(offerLevel);
    });

    return offers;
  }
);
