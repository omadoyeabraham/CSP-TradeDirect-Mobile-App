import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  combineReducers,
  compose
} from "@ngrx/store";
import { InjectionToken } from "@angular/core";
import { storageSync } from "ngrx-store-ionic-storage";

import authReducer from "./auth/auth.reducers";
import userReducer from "./user/user.reducer";
import errorReducer from "./error/error.reducer";
import stockbrokingPortfolioReducer, {
  stbActivePortfolioReducer,
  stbActivePortfolioMetaDataReducer
} from "./stockbroking/portfolios.reducer";
import fixedIncomeReducer, {
  fxInvestmentsReducer
} from "./fixedIncome/fixedIncome.reducer";
import tradeOrderTermReducer, {
  previewedTradeOrderReducer,
  tradeOrderHistoryReducer,
  tradeOrderCancellationReducer
} from "./stockbroking/tradeOrder.reducer";
import selectedPageReducer from "./selectedPage/selectedPage.reducer";
import {
  IAuthState,
  IUserState,
  IErrorState,
  IStockBrokingPortfolioState,
  IStbActivePortfolioMetaData,
  ITradeOrderCancellationState,
  ICashState,
  IWatchListState
} from "../models";
import securitiesReducer, {
  selectedSecurityOnOverviewPageReducer,
  selectedSecurityMarketDataReducer
} from "./stockbroking/securities.reducer";
// import { IPortfolio } from "../../stockbrokingModule/models/portfolio.interface";
import {
  ISecurity,
  IPortfolio,
  ITradeOrder,
  IMarketData,
  IPortfolioHolding
} from "../../stockbrokingModule/models";
import { IFixedIncomeInvestment } from "../../fixedIncomeModule/models";
import { ITradeOrderTerm } from "../../stockbrokingModule/models/tradeOrderTerm.interface";
import marketDataReducer from "./stockbroking/marketdata.reducer";
import { LOGOUT } from "..";
import cashReducer, {
  selectedNairaCashAccountReducer,
  selectedDollarCashAccountReducer,
  cashAccountsStatementsReducer
} from "./cash/cash.reducer";
import { ICashAccountInterface } from "../../cashModule/models/cashAccount.interface";
import smaReducer, { smaFiReducer } from "./stockbroking/sma.reducer";
import watchlistReducer from "./stockbroking/watchlist.reducer";

// Interface describing the shape of our root reducer
export interface IRootReducer {
  auth: IAuthState;
  user: IUserState;
  error: IErrorState;
  cashAccounts: ICashState;
  selectedPage: any;
  stbPortfolios: IStockBrokingPortfolioState;
  stbActivePortfolio: IPortfolio;
  stbActivePortfolioMetaData: IStbActivePortfolioMetaData;
  stbSecurities: Array<ISecurity>;
  stbSelectedSecurityOnOverviewPage: ISecurity;
  stbSelectedSecurityMarketData: Object;
  stbTradeOrderTerms: Array<ITradeOrderTerm>;
  stbPreviewedTradeOrder: ITradeOrder;
  stbTradeOrders: Array<any>;
  stbMarketData: Array<IMarketData>;
  stbTradeOrderCancellation: ITradeOrderCancellationState;
  watchList: IWatchListState;
  smaHoldings: IPortfolioHolding[];
  smaFI: IFixedIncomeInvestment[];
  fixedIncomeInvestments: Array<IFixedIncomeInvestment>;
  fxInvestments: Array<IFixedIncomeInvestment>;
  cashActiveNairaAccount: ICashAccountInterface;
  cashActiveDollarAccount: ICashAccountInterface;
  cashAccountStatementsEntities: any;
}

export const initialState = {
  auth: {},
  user: {},
  error: {},
  cashAccounts: {},
  selectedPage: {},
  stbPortfolios: {},
  stbActivePortfolio: {},
  stbActivePortfolioMetaData: {},
  stbSecurities: {},
  stbSelectedSecurityOnOverviewPage: {},
  stbSelectedSecurityMarketData: {},
  stbTradeOrderTerms: {},
  stbPreviewedTradeOrder: {},
  stbTradeOrders: {},
  stbMarketData: {},
  stbTradeOrderCancellation: {},
  watchList: {},
  smaHoldings: {},
  smaFI: {},
  fixedIncomeInvestments: {},
  fxInvestments: {},
  cashActiveNairaAccount: {},
  cashActiveDollarAccount: {},
  cashAccountStatementsEntities: {}
};

export function getInitialState() {
  return { ...initialState };
}

/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */

// export const rootReducer: ActionReducerMap<IRootReducer> = {
export const rootReducer: ActionReducerMap<IRootReducer> = {
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
  cashAccounts: cashReducer,
  selectedPage: selectedPageReducer,
  stbPortfolios: stockbrokingPortfolioReducer,
  stbActivePortfolio: stbActivePortfolioReducer,
  stbActivePortfolioMetaData: stbActivePortfolioMetaDataReducer,
  stbSecurities: securitiesReducer,
  stbSelectedSecurityOnOverviewPage: selectedSecurityOnOverviewPageReducer,
  stbSelectedSecurityMarketData: selectedSecurityMarketDataReducer,
  stbTradeOrderTerms: tradeOrderTermReducer,
  stbPreviewedTradeOrder: previewedTradeOrderReducer,
  stbTradeOrders: tradeOrderHistoryReducer,
  stbMarketData: marketDataReducer,
  stbTradeOrderCancellation: tradeOrderCancellationReducer,
  watchList: watchlistReducer,
  smaHoldings: smaReducer,
  smaFI: smaFiReducer,
  fixedIncomeInvestments: fixedIncomeReducer,
  fxInvestments: fxInvestmentsReducer,
  cashActiveNairaAccount: selectedNairaCashAccountReducer,
  cashActiveDollarAccount: selectedDollarCashAccountReducer,
  cashAccountStatementsEntities: cashAccountsStatementsReducer
};

// export const rootReducer = combineReducers(_rootReducer);
// export const rootReducer = _rootReducer;

export function getReducers() {
  return rootReducer;
}

export const ReducerToken = new InjectionToken("Registered Reducers");
export const ReducerProvider = [
  { provide: ReducerToken, useFactory: getReducers }
];

// export function rootReducer(state, action) {
//   return _rootReducer(state, action);
// }

/**
 * Function to be called when a syncing error occurs between the store and local storage.
 *
 * @param err
 */
export const onSyncError = err => {
  console.group();
  console.log("AN ERROR OCCURED WHILE SYNCING STATE TO LOCAL STORAGE");
  console.log(err);
  console.groupEnd();
};

// Configuration for ngrx-store-ionic-storage
export const storageSyncReducer = storageSync({
  keys: [
    "user",
    "error",
    "cashAccounts",
    "selectedPage",
    "stbPortfolios",
    "stbActivePortfolio",
    "stbSecurities",
    "stbSelectedSecurityOnOverviewPage",
    "stbSelectedSecurityMarketData",
    "stbTradeOrderTerms",
    "stbPreviewedTradeOrder",
    "stbTradeOrders",
    "stbMarketData",
    "watchList",
    "smaHoldings",
    "smaFI",
    // "stbTradeOrderCancellation",
    "fixedIncomeInvestments",
    "fxInvestments",
    "cashActiveNairaAccount",
    "cashActiveDollarAccount",
    "cashAccountStatementsEntities"
  ],
  hydratedStateKey: "hydrated", // Add this key to the state
  onSyncError: onSyncError // If a sync fails
});

/**
 * MetaReducer used to sync the store to localstorage
 *
 */
export function storageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any, any> {
  return storageSyncReducer(reducer);
}

/**
 * MetaReducer used to handle the LOGOUT action.
 *
 * @export
 * @param {any} reducer
 * @returns
 */
export function resetReducer(reducer) {
  return function newReducer(state, action) {
    if (action.type === LOGOUT) {
      state = undefined;
    }

    const nextState = reducer(state, action);
    return nextState;
  };
}

// MetaReducers array used in app.module.ts
export const metaReducers: MetaReducer<any>[] = [
  storageMetaReducer,
  resetReducer
];
