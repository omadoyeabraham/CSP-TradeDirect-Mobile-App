import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as moment from "moment";
import { ITradeOrderTerm } from "../../../stockbrokingModule/models/tradeOrderTerm.interface";
import { ITradeOrder, IPortfolio } from "../../../stockbrokingModule/models";
import { getActivePortfolio } from "../index";

/**
 * Get the "tradeOrderTerms" slice of state
 */
export const getTradeOrderTerms = createFeatureSelector<Array<ITradeOrderTerm>>(
  "stbTradeOrderTerms"
);

/**
 * Get the trade order terms sorted by lifetime of the term
 */
export const getSortedTradeOrderTerms = createSelector(
  getTradeOrderTerms,
  (state: Array<ITradeOrderTerm>) => {
    return state.sort((a, b) => a.defLifeTime - b.defLifeTime);
  }
);

export const getPreviewedTradeOrder = createFeatureSelector<ITradeOrder>(
  "stbPreviewedTradeOrder"
);

/**
 * Get the "stbTradeOrders" slice of state
 */
export const getAllTradeOrders = createFeatureSelector<Array<any>>(
  "stbTradeOrders"
);

/**
 * Get the trade orders that belong to the active portfolio
 */
export const getActivePortfolioTradeOrders = createSelector(
  getAllTradeOrders,
  getActivePortfolio,
  (tradeOrders: Array<any>, activePortfolio: IPortfolio) => {
    return tradeOrders.filter(
      tradeOrder => tradeOrder.portfolioName === activePortfolio.name
    );
  }
);

/**
 * Group the trade orders in the active portfolio by date
 */
export const getActivePortfolioTradeOrdersGroupedByDate = createSelector(
  getActivePortfolioTradeOrders,
  (tradeOrders: Array<any>) => {
    let groupedTradeOrders: Array<any> = [];
    let tradeOrderDates: Array<any> = [];
    let count: number = 0;

    tradeOrders.forEach(tradeOrder => {
      let tradeOrderDate = tradeOrder.orderDate;
      tradeOrderDate = moment(tradeOrderDate).format("ddd MMM DD YYYY");

      // Check if an order on the current date has already been sorted
      if (tradeOrderDates[tradeOrderDate]) {
        groupedTradeOrders[tradeOrderDates[tradeOrderDate]].push(tradeOrder);
      } else {
        // Set so we can track the array index where tradeOrders of a particular date are stored
        tradeOrderDates[tradeOrderDate] = count;

        // Set so we have access to the date for a particular group of trade orders
        groupedTradeOrders[count] = [
          {
            date: tradeOrderDate
          }
        ];

        groupedTradeOrders[count].push(tradeOrder);

        // Increment count for when a group of tradeOrders are created
        count = count + 1;
      }
    });

    return groupedTradeOrders;
  }
);
