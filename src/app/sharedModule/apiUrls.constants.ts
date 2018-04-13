/**
 * The urls to various api endpoints. This file is used so there is a single source of truth for all api endpoints used in various services
 */

const baseURL = "https://restserver2.cardinalstone.com/api/";

// Authentication endpoints
export const loginURL = baseURL + "findCustomerByName";

// USER ENDPOINTS
export const FindUserByUsernameURL = baseURL + "findCustomerByUsername";
export const SendPasswordResetLinkURL = baseURL + "sendPasswordResetLink";
export const GetUserDataURL = baseURL + "findCustomerById";

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

// WATCHLIST ENDPOINTS
export const GetWatchListURL = baseURL + "getWatchList";
export const CreateWatchListURL = baseURL + "createWatchList";
export const UpdateWatchListURL = baseURL + "updateWatchList";
export const DeleteWatchListURL = baseURL + "deleteWatchList";
export const ToggleWatchListURL = baseURL + "toggleWatchList";

// CASH ENDPOINTS
export const getCashAccountStatementsURL =
  baseURL + "findFiAcctLedgerEntriesByAccountNumber";

// ACCOUNT ENDPOINTS
export const changePasswordURL = baseURL + "changePassword";
export const resetPasswordURL = baseURL + "resetPassword";
export const contactManagerURL = baseURL + "contactManager";
