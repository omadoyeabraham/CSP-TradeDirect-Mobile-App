import { Action, Store } from "@ngrx/store";

import { ITradeOrderTerm } from "../../../stockbrokingModule/models/tradeOrderTerm.interface";
import { Injectable } from "@angular/core";
import { IAppState } from "../../models";

export const SAVE_TRADE_ORDER_TERMS_IN_STORE =
  "[STB TRADE ORDERS] Save the active trade order terms in the store";

export class SaveTradeOrderTermsInStore implements Action {
  readonly type = SAVE_TRADE_ORDER_TERMS_IN_STORE;
  constructor(public payload: Array<ITradeOrderTerm>) {}
}

export type TradeOrderActions = SaveTradeOrderTermsInStore;

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
}
