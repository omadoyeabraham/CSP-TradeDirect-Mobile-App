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

export const SAVE_NAIRA_CASH_STATEMENTS =
  "[CASH] Save the cash statements for the active cash statements";

export const SAVE_DOLLAR_CASH_STATEMENTS =
  "[CASH] Save the cash statements for the active dollar cash statements";

export const POPULATE_CASH_ACCOUNT_STATEMENTS_ENTITIES =
  "[CASH] Create an object entity which houses the statements for the cash accounts all the cash accounts as they are loaded";

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

export class populateCashAccountStatementsEntities implements Action {
  readonly type = POPULATE_CASH_ACCOUNT_STATEMENTS_ENTITIES;
  constructor(public payload: Array<ICashAccountInterface>) {}
}

export type CashActionTypes =
  | saveCashAcccountsToStore
  | saveActiveNairaCashAccountToStore
  | saveActiveDollarCashAccountToStore
  | populateCashAccountStatementsEntities;

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

  populateCashAccountStatementsEntities(payload: Array<ICashAccountInterface>) {
    this.store.dispatch(new populateCashAccountStatementsEntities(payload));
  }
}
