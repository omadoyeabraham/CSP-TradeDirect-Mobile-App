import { Action, Store } from "@ngrx/store";

import { ITradeOrderTerm } from "../../../stockbrokingModule/models/tradeOrderTerm.interface";
import { Injectable } from "@angular/core";
import { IAppState } from "../../models";
import { ITradeOrder } from "../../../stockbrokingModule/models";

export const SAVE_TRADE_ORDER_TERMS_IN_STORE =
  "[STB TRADE ORDERS] Save the active trade order terms in the store";
export const PREVIEW_TRADE_ORDER =
  "[STB TRADE ORDERS] Preview the trade order a client is trying to place";

export class SaveTradeOrderTermsInStore implements Action {
  readonly type = SAVE_TRADE_ORDER_TERMS_IN_STORE;
  constructor(public payload: Array<ITradeOrderTerm>) {}
}

export class PreviewTradeOrder implements Action {
  readonly type = PREVIEW_TRADE_ORDER;
  constructor(public payload: ITradeOrder) {}
}

export type TradeOrderActions = SaveTradeOrderTermsInStore | PreviewTradeOrder;

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
   * Dispatch the action to preview a trade order
   *
   * @param {ITradeOrder} payload
   * @memberof TradeOrderActionsDispatcher
   */
  previewTradeOrder(payload: ITradeOrder) {
    this.store.dispatch(new PreviewTradeOrder(payload));
  }
}
