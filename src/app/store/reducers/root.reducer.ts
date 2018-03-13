import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
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
  ICashState
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
  IMarketData
} from "../../stockbrokingModule/models";
import { IFixedIncomeInvestment } from "../../fixedIncomeModule/models";
import { ITradeOrderTerm } from "../../stockbrokingModule/models/tradeOrderTerm.interface";
import marketDataReducer from "./stockbroking/marketdata.reducer";
import { LOGOUT } from "..";
import cashReducer, {
  selectedNairaCashAccountReducer
} from "./cash/cash.reducer";
import { ICashAccountInterface } from "../../cashModule/models/cashAccount.interface";

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
  fixedIncomeInvestments: Array<IFixedIncomeInvestment>;
  fxInvestments: Array<IFixedIncomeInvestment>;
  cashActiveNairaAccount: ICashAccountInterface;
}

/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */
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
  fixedIncomeInvestments: fixedIncomeReducer,
  fxInvestments: fxInvestmentsReducer,
  cashActiveNairaAccount: selectedNairaCashAccountReducer
};

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
//TODO: remove auth from the keys
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
    // "stbTradeOrderCancellation",
    "fixedIncomeInvestments",
    "fxInvestments",
    "cashActiveNairaAccount"
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
