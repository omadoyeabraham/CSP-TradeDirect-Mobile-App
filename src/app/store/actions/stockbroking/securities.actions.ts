import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IAppState } from "../../models";
import { ISecurity } from "../../../stockbrokingModule/models";

// Action type constants
export const GET_SECURITIES =
  "[STB SECURITIES] Get the list of all tradeable securities";
export const SAVE_SECURITIES_IN_STORE =
  "[STB SECURITIES] Save the list of securities into the store";
export const SET_SELECTED_SECURITY_ON_OVERVIEW_PAGE =
  "[STB SECURITIES] Set the security selected by the user on the trade overview page";
export const SAVE_SELECTED_SECURITY_ON_OVERVIEW_PAGE_MARKET_DATA_TO_STORE =
  "[STB SECURITIES] Save the market data for the selected security on the overview page to the store";

// Action creator to get securities
export class getSecurities implements Action {
  readonly type = GET_SECURITIES;
}

// Action creator to save securities in the store
export class saveSecuritiesInStore implements Action {
  readonly type = SAVE_SECURITIES_IN_STORE;
  constructor(public payload: Array<ISecurity> = []) {}
}

export class setSelectedSecurityOnOverviewPage implements Action {
  readonly type = SET_SELECTED_SECURITY_ON_OVERVIEW_PAGE;
  constructor(public payload: ISecurity = {} as ISecurity) {}
}

export class saveSelectedSecurityOnOverviewPageMarketDataToStore
  implements Action {
  readonly type = SAVE_SELECTED_SECURITY_ON_OVERVIEW_PAGE_MARKET_DATA_TO_STORE;
  constructor(public payload: any) {}
}

/**
 * Action dispatcher class for securities
 *
 * @export
 * @class SecuritiesActionsDispatcher
 */
@Injectable()
export class SecuritiesActionsDispatcher {
  constructor(private store: Store<IAppState>) {}

  /**
   * Dispatch the action to get securities from the API
   *
   * @memberof SecuritiesActionsDispatcher
   */
  getSecurities() {
    this.store.dispatch(new getSecurities());
  }

  /**
   * Dispatch the action to save secuties into the store
   *
   * @param {ISecurity} payload
   * @memberof SecuritiesActionsDispatcher
   */
  saveSecuritiesInStore(payload: Array<ISecurity>) {
    this.store.dispatch(new saveSecuritiesInStore(payload));
  }

  /**
   * Dispatch the action to set the selected security on the overview page
   *
   * @param {ISecurity} [payload={} as ISecurity]
   * @memberof SecuritiesActionsDispatcher
   */
  setSelectedSecurityOnOverviewPage(payload: ISecurity = {} as ISecurity) {
    this.store.dispatch(new setSelectedSecurityOnOverviewPage(payload));
  }

  /**
   * Dispatch the action to save the selcted security's market data to the store
   *
   * @param {*} payload
   * @memberof SecuritiesActionsDispatcher
   */
  saveSelectedSecurityOnOverviewPageMarketDataToStore(payload: any) {
    this.store.dispatch(
      new saveSelectedSecurityOnOverviewPageMarketDataToStore(payload)
    );
  }
}

export type SecuritiesActionTypes =
  | getSecurities
  | saveSecuritiesInStore
  | setSelectedSecurityOnOverviewPage
  | saveSelectedSecurityOnOverviewPageMarketDataToStore;
