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
 *
 */
export const getSelectedSecurityGraphData = createSelector(
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
        price: data.tradePrice
      };
    });

    // So the graph is plotted in the correct order
    priceMovements.reverse();

    return priceMovements;
  }
);
