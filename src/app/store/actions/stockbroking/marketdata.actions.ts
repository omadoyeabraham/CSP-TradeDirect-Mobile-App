import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IMarketData } from "../../../stockbrokingModule/models";
import { IAppState } from "../../models";

export const GET_MARKET_DATA =
  "[STB MARKET DATA] Get the market data for all stocks trading on the NSE";
export const SAVE_MARKET_DATA_TO_STORE =
  "[STB MARKET DATA] Save market data to the store";

export class GetMarketData implements Action {
  readonly type = GET_MARKET_DATA;
  constructor() {}
}

export class SaveMarketDataToStore implements Action {
  readonly type = SAVE_MARKET_DATA_TO_STORE;
  constructor(public payload: Array<IMarketData>) {}
}

export type MarketDataActionTypes = GetMarketData | SaveMarketDataToStore;

@Injectable()
export class MarketDataActionsDispatcher {
  constructor(private store: Store<IAppState>) {}

  /**
   * Dispatch the action to obtain market data from the NSE
   *
   * @memberof MarketDataActionsDispatcher
   */
  public getMarketData() {
    this.store.dispatch(new GetMarketData());
  }

  /**
   * Dispatch the action to place market data obtained from the NSE in our redux store
   *
   * @param {Array<IMarketData>} payload
   * @memberof MarketDataActionsDispatcher
   */
  public SaveMarketDataToStore(payload: Array<IMarketData>) {
    this.store.dispatch(new SaveMarketDataToStore(payload));
  }
}
