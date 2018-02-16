import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IAppState } from "../../models";
import { ISecurity } from "../../../stockbrokingModule/models";

// Action type constants
export const GET_SECURITIES =
  "[STB SECURITIES] Get the list of all tradeable securities";
export const SAVE_SECURITIES_IN_STORE =
  "[STB SECURITIES] Save the list of securities into the store";

// Action creator to get securities
export class getSecurities implements Action {
  readonly type = GET_SECURITIES;
}

// Action creator to save securities in the store
export class saveSecuritiesInStore implements Action {
  readonly type = SAVE_SECURITIES_IN_STORE;
  constructor(public payload: ISecurity) {}
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
}

export type SecuritiesActionTypes = getSecurities | saveSecuritiesInStore;
