/**
 * The urls to various api endpoints. This file is used so there is a single source of truth for all api endpoints used in various services
 */

const baseURL = "https://restserver2.cardinalstone.com/api/";

// Authentication endpoints
export const loginURL = baseURL + "findCustomerByName";

// STOCKBROKING ENDPOINTS
export const getSecuritiesURL = baseURL + "getSecurityNames";
export const getSelectedSecurityMarketDataURL =
  baseURL + "findSecurityOverviewByName";
export const getActiveTradeOrderTermsURL =
  baseURL + "findActiveTradeOrderTerms";
export const previewTradeOrderURL = baseURL + "getTradeOrderTotal";
export const executeTradeOrderURL = baseURL + "createTradeOrder";
export const cancelTradeOrderURL = baseURL + "cancelTradeOrder";
export const getTradeOrdersURL = baseURL + "findCustomerOrders";
export const getMarketDataURL = baseURL + "getSecurity";
