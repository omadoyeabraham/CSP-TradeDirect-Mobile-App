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
 * Get the cardinalstone defined order status for a trade order
 *
 * @param tradeOrder
 * @returns {string}
 */
const _getTradeOrderCspStatus = (tradeOrder): string => {
  if (
    tradeOrder.orderStatus == "EXECUTING" &&
    tradeOrder.fixOrderStatus == "PARTIALLY_FILLED"
  ) {
    return "PARTIALLY FILLED";
  }

  if (
    (tradeOrder.fixOrderStatus == "NEW" ||
      tradeOrder.fixOrderStatus == "REPLACED") &&
    tradeOrder.orderStatus == "EXECUTING"
  ) {
    return "EXECUTING";
  }

  if (tradeOrder.isBooked) {
    return "PENDING";
  }

  if (
    tradeOrder.orderStatus == "EXECUTING" &&
    tradeOrder.fixOrderStatus == "FILLED"
  ) {
    return "EXECUTED";
  }

  return tradeOrder.orderStatus;
};

/**
 * Group an array of trade orders by date
 *
 * @param tradeOrders
 */
const _groupTradeOrdersByDate = (tradeOrders: Array<any>) => {
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
};

/*
Determine if a trade order has been booked
*
* @param {ITradeOrder} tradeOrder
* @returns {boolean}
*/
const _determineIfTradeOrderIsBooked = (tradeOrder: any): boolean => {
  return (
    tradeOrder.orderStatus == "BOOKED" ||
    (tradeOrder.fixOrderStatus == "NA" &&
      tradeOrder.orderStatus == "EXECUTING") ||
    (tradeOrder.fixOrderStatus == "REJECTED" &&
      tradeOrder.orderStatus == "EXECUTING")
  );
};

/**
 * Determine if a trade order can be cancelled or not.
 *
 * @param {ITradeOrder} tradeOrder
 * @returns {boolean}
 */
const _determineIfTradeOrderCanBeCancelled = (tradeOrder: any): boolean => {
  return (
    tradeOrder.orderStatus == "BOOKED" ||
    (tradeOrder.fixOrderStatus == "NEW" &&
      tradeOrder.orderStatus == "EXECUTING") ||
    (tradeOrder.fixOrderStatus == "REPLACED" &&
      tradeOrder.orderStatus == "EXECUTING") ||
    (tradeOrder.fixOrderStatus == "REJECTED" &&
      tradeOrder.orderStatus == "EXECUTING") ||
    (tradeOrder.fixOrderStatus == "NA" && tradeOrder.orderStatus == "EXECUTING")
  );
};

/**
 * Get the trade orders that belong to the active portfolio
 */
export const getActivePortfolioTradeOrders = createSelector(
  getAllTradeOrders,
  getActivePortfolio,
  (tradeOrders: Array<any>, activePortfolio: IPortfolio) => {
    let activePortfolioTradeOrders = tradeOrders.filter(
      tradeOrder => tradeOrder.portfolioName === activePortfolio.name
    );

    // Loop over the trade orders and determine the csp order status for each.
    activePortfolioTradeOrders = activePortfolioTradeOrders.map(tradeOrder => {
      return {
        ...tradeOrder,
        cspOrderStatus: _getTradeOrderCspStatus(tradeOrder),
        canBeCancelled: _determineIfTradeOrderCanBeCancelled(tradeOrder),
        isBooked: _determineIfTradeOrderIsBooked(tradeOrder)
      };
    });

    return activePortfolioTradeOrders;
  }
);

/**
 * Get the outstanding trade orders in the active portfolio
 */
export const getActivePortfolioOutstandingTradeOrders = createSelector(
  getActivePortfolioTradeOrders,
  (tradeOrders: Array<any>) => {
    return tradeOrders.filter(tradeOrder => {
      return (
        tradeOrder.cspOrderStatus === "PENDING" ||
        tradeOrder.cspOrderStatus === "EXECUTING" ||
        tradeOrder.fixOrderStatus === "PARTIALLY_FILLED"
      );
    });
  }
);

/**
 * Group the trade orders in the active portfolio by date
 */
export const getActivePortfolioTradeOrdersGroupedByDate = createSelector(
  getActivePortfolioTradeOrders,
  _groupTradeOrdersByDate
);

/**
 * Group the outstanding trade orders in the active portfolio by date
 */
export const getActivePortfolioOutstandingTradeOrdersGroupedByDate = createSelector(
  getActivePortfolioOutstandingTradeOrders,
  _groupTradeOrdersByDate
);

export const getTradeOrderCancellationState = createFeatureSelector(
  "stbTradeOrderCancellation"
);
