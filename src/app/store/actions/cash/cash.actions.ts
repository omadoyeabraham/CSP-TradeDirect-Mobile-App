import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { IAppState } from "../../models";

export const SAVE_CASH_ACCOUNTS_TO_STORE =
  "[CASH] Save the users cash accounts to the store ";

export class saveCashAcccountsToStore implements Action {
  readonly type = SAVE_CASH_ACCOUNTS_TO_STORE;
  constructor(public payload: any) {}
}

export type CashActionTypes = saveCashAcccountsToStore;

@Injectable()
export class CashActionsDispatcher {
  constructor(public store: Store<IAppState>) {}

  saveCashAccountsToStore(payload: any) {
    this.store.dispatch(new saveCashAcccountsToStore(payload));
  }
}
