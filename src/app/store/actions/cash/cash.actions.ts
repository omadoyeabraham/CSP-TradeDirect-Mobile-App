import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { IAppState } from "../../models";
import { ICashAccountInterface } from "../../../cashModule/models/cashAccount.interface";

export const SAVE_CASH_ACCOUNTS_TO_STORE =
  "[CASH] Save the users cash accounts to the store ";

export const SAVE_ACTIVE_NAIRA_CASH_ACCOUNT =
  "[CASH] Save the selected naira cash account to the store";

export const SAVE_ACTIVE_DOLLAR_CASH_ACCOUNT =
  "[CASH] Save the selected dollar cash account to the store";

export class saveCashAcccountsToStore implements Action {
  readonly type = SAVE_CASH_ACCOUNTS_TO_STORE;
  constructor(public payload: any) {}
}

export class saveActiveNairaCashAccountToStore implements Action {
  readonly type = SAVE_ACTIVE_NAIRA_CASH_ACCOUNT;
  constructor(public payload: ICashAccountInterface) {}
}

export class saveActiveDollarCashAccountToStore implements Action {
  readonly type = SAVE_ACTIVE_DOLLAR_CASH_ACCOUNT;
  constructor(public payload: ICashAccountInterface) {}
}

export type CashActionTypes =
  | saveCashAcccountsToStore
  | saveActiveNairaCashAccountToStore
  | saveActiveDollarCashAccountToStore;

@Injectable()
export class CashActionsDispatcher {
  constructor(public store: Store<IAppState>) {}

  saveCashAccountsToStore(payload: any) {
    this.store.dispatch(new saveCashAcccountsToStore(payload));
  }

  saveActiveNairaCashAccountToStore(payload: ICashAccountInterface) {
    this.store.dispatch(new saveActiveNairaCashAccountToStore(payload));
  }

  saveActiveDollarCashAccountToStore(payload: ICashAccountInterface) {
    this.store.dispatch(new saveActiveDollarCashAccountToStore(payload));
  }
}
