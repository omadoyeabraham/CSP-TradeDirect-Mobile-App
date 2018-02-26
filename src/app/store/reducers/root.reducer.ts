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
  tradeOrderHistoryReducer
} from "./stockbroking/tradeOrder.reducer";
import selectedPageReducer from "./selectedPage/selectedPage.reducer";
import {
  IAuthState,
  IUserState,
  IErrorState,
  IStockBrokingPortfolioState,
  IStbActivePortfolioMetaData
} from "../models";
import securitiesReducer, {
  selectedSecurityOnOverviewPageReducer,
  selectedSecurityMarketDataReducer
} from "./stockbroking/securities.reducer";
// import { IPortfolio } from "../../stockbrokingModule/models/portfolio.interface";
import {
  ISecurity,
  IPortfolio,
  ITradeOrder
} from "../../stockbrokingModule/models";
import { IFixedIncomeInvestment } from "../../fixedIncomeModule/models";
import { ITradeOrderTerm } from "../../stockbrokingModule/models/tradeOrderTerm.interface";

// Interface describing the shape of our root reducer
export interface IRootReducer {
  auth: IAuthState;
  user: IUserState;
  error: IErrorState;
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
  fixedIncomeInvestments: Array<IFixedIncomeInvestment>;
  fxInvestments: Array<IFixedIncomeInvestment>;
}

/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */
export const rootReducer: ActionReducerMap<IRootReducer> = {
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
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
  fixedIncomeInvestments: fixedIncomeReducer,
  fxInvestments: fxInvestmentsReducer
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
    "selectedPage",
    "stbPortfolios",
    "stbActivePortfolio",
    "stbSecurities",
    "stbSelectedSecurityOnOverviewPage",
    "stbSelectedSecurityMarketData",
    "stbTradeOrderTerms",
    "stbPreviewedTradeOrder",
    "stbTradeOrders",
    "fixedIncomeInvestments",
    "fxInvestments"
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

// MetaReducers array used in app.module.ts
export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];
