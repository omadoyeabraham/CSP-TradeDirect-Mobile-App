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
export const CANCEL_TRADE_ORDER = "[STB TRADE ORDERS] Cancel a trade order";
export const CANCEL_TRADE_ORDER_SUCCESS =
  "[STB TRADE ORDERS] A trade order was cancelled successfully";
export const CANCEL_TRADE_ORDER_FAILURE =
  "[STB TRADE ORDERS] A trade order cancellation failed";
export const RESET_CANCEL_TRADE_ORDER_STATE =
  "[STB TRADE ORDERS] Reset the cancel trade order state to the default";

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

export class CancelTradeOrder implements Action {
  readonly type = CANCEL_TRADE_ORDER;
  constructor(public payload: number) {}
}

export class CancelTradeOrderSuccess implements Action {
  readonly type = CANCEL_TRADE_ORDER_SUCCESS;
  constructor() {}
}

export class CancelTradeOrderFailure implements Action {
  readonly type = CANCEL_TRADE_ORDER_FAILURE;
  constructor() {}
}

export class ResetCancelTradeOrderState implements Action {
  readonly type = RESET_CANCEL_TRADE_ORDER_STATE;
  constructor() {}
}

export type TradeOrderActionTypes =
  | SaveTradeOrderTermsInStore
  | SavePreviewedTradeOrderInStore
  | ClearPreviewedTradeOrder
  | GetTradeOrderHistory
  | SaveTradeOrderHistoryInStore
  | CancelTradeOrder
  | CancelTradeOrderSuccess
  | CancelTradeOrderFailure
  | ResetCancelTradeOrderState;

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
  getTradeOrderHistory() {
    this.store.dispatch(new GetTradeOrderHistory());
  }

  /**
   * Dispatch the action to save the trade order history in the store
   *
   * @param {Array<any>} payload
   * @memberof TradeOrderActionsDispatcher
   */
  saveTradeOrderHistoryInStore(payload: Array<any>) {
    this.store.dispatch(new SaveTradeOrderHistoryInStore(payload));
  }

  /**
   * Dispatch the action to cancel a trade order
   *
   * @param {*} payload
   * @memberof TradeOrderActionsDispatcher
   */
  cancelTradeOrder(payload: number) {
    this.store.dispatch(new CancelTradeOrder(payload));
  }

  /**
   * Dispatch the action for when a trade order is cancelled successfully
   *
   * @memberof TradeOrderActionsDispatcher
   */
  cancelTradeOrderSuccess() {
    this.store.dispatch(new CancelTradeOrderSuccess());
  }

  /**
   * Dispatch the action for when a trade order's cancellation fails
   *
   * @memberof TradeOrderActionsDispatcher
   */
  cancelTradeOrderFailure() {
    this.store.dispatch(new CancelTradeOrderFailure());
  }

  /**
   * Reset the cancel trade order state
   *
   * @memberof TradeOrderActionsDispatcher
   */
  resetCancelTradeOrderState() {
    this.store.dispatch(new ResetCancelTradeOrderState());
  }
}
