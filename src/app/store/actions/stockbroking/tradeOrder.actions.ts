import { Action, Store } from "@ngrx/store";

import { ITradeOrderTerm } from "../../../stockbrokingModule/models/tradeOrderTerm.interface";
import { Injectable } from "@angular/core";
import { IAppState } from "../../models";
import { ITradeOrder } from "../../../stockbrokingModule/models";

export const SAVE_TRADE_ORDER_TERMS_IN_STORE =
  "[STB TRADE ORDERS] Save the active trade order terms in the store";
export const SAVE_PREVIEWED_TRADE_ORDER_IN_STORE =
  "[STB TRADE ORDERS] Save the previewed trade order a client is trying to place";
export const CLEAR_PREVIEWED_TRADE_ORDER_IN_STORE =
  "[STB TRADE ORDERS] Clear the previewed trade order stored in the store";
export const GET_TRADE_ORDER_HISTORY =
  "[STB TRADE ORDERS] Get the user's trade order history";
export const SAVE_TRADE_ORDER_HISTORY_IN_STORE =
  "[STB TRADE ORDERS] Save the user's trade order history in the store";

export class SaveTradeOrderTermsInStore implements Action {
  readonly type = SAVE_TRADE_ORDER_TERMS_IN_STORE;
  constructor(public payload: Array<ITradeOrderTerm>) {}
}

export class SavePreviewedTradeOrderInStore implements Action {
  readonly type = SAVE_PREVIEWED_TRADE_ORDER_IN_STORE;
  constructor(public payload: ITradeOrder) {}
}

export class ClearPreviewedTradeOrder implements Action {
  readonly type = CLEAR_PREVIEWED_TRADE_ORDER_IN_STORE;
  constructor() {}
}

export class GetTradeOrderHistory implements Action {
  readonly type = GET_TRADE_ORDER_HISTORY;
  constructor() {}
}

export class SaveTradeOrderHistoryInStore implements Action {
  readonly type = SAVE_TRADE_ORDER_HISTORY_IN_STORE;
  constructor(public payload: Array<any>) {}
}

export type TradeOrderActionTypes =
  | SaveTradeOrderTermsInStore
  | SavePreviewedTradeOrderInStore
  | ClearPreviewedTradeOrder
  | GetTradeOrderHistory
  | SaveTradeOrderHistoryInStore;

/**
 * Action dispatcher class for trade order actions
 *
 * @export
 * @class TradeOrderActionsDispatcher
 */
@Injectable()
export class TradeOrderActionsDispatcher {
  constructor(private store: Store<IAppState>) {}

  /**
   * Dispatch the action to save the trade order terms into the store
   *
   * @param {Array<ITradeOrderTerm>} payload
   * @memberof TradeOrderActionsDispatcher
   */
  saveTradeOrderTermsInStore(payload: Array<ITradeOrderTerm>) {
    this.store.dispatch(new SaveTradeOrderTermsInStore(payload));
  }

  /**
   * Dispatch the action to save a previewed trade order in the store
   *
   * @param {ITradeOrder} payload
   * @memberof TradeOrderActionsDispatcher
   */
  savePreviewedTradeOrderInStore(payload: ITradeOrder) {
    this.store.dispatch(new SavePreviewedTradeOrderInStore(payload));
  }

  /**
   * Dispatch the action to clear the previewed trade order from the store
   *
   * @memberof TradeOrderActionsDispatcher
   */
  clearPreviewedTradeOrder() {
    this.store.dispatch(new ClearPreviewedTradeOrder());
  }

  /**
   * Dispatch the action to refresh the trade order History
   *
   * @memberof TradeOrderActionsDispatcher
   */
  getTradeOrderHistory() {}

  /**
   * Dispatch the action to save the trade order history in the store
   *
   * @param {Array<any>} payload
   * @memberof TradeOrderActionsDispatcher
   */
  saveTradeOrderHistoryInStore(payload: Array<any>) {
    this.store.dispatch(new SaveTradeOrderHistoryInStore(payload));
  }
}