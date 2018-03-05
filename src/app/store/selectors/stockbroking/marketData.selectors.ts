import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IMarketData } from "../../../stockbrokingModule/models";

export const _getMarketData = createFeatureSelector<Array<IMarketData>>(
  "stbMarketData"
);

/**
 * Get the marketdata from the store, including calculating the priceChange and priceChangePercent
 */
export const getMarketData = createSelector(_getMarketData, (marketData: Array<IMarketData>) => {
  return marketData.map((security: IMarketData) => {
    security.priceChange = parseFloat(security.lastTradePrice) - parseFloat(security.previousClose);
    security.priceChangePercent = (security.priceChange / parseFloat(security.previousClose)) * 100;

    return security
  })
})
