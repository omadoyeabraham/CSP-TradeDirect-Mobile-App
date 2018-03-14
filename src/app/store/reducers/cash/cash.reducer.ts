import {
  CashActionTypes,
  SAVE_CASH_ACCOUNTS_TO_STORE,
  SAVE_ACTIVE_NAIRA_CASH_ACCOUNT,
  POPULATE_CASH_ACCOUNT_STATEMENTS_ENTITIES
} from "../..";
import { ICashState } from "../../models";
import { ICashAccountInterface } from "../../../cashModule/models/cashAccount.interface";

export default function cashReducer(
  state: ICashState = {} as ICashState,
  action: CashActionTypes
): ICashState {
  switch (action.type) {
    case SAVE_CASH_ACCOUNTS_TO_STORE:
      return action.payload;
    default:
      return state;
  }
}

export function selectedNairaCashAccountReducer(
  state: ICashAccountInterface = {} as ICashAccountInterface,
  action: CashActionTypes
): ICashAccountInterface {
  switch (action.type) {
    case SAVE_ACTIVE_NAIRA_CASH_ACCOUNT:
      return action.payload;

    default:
      return state;
  }
}

export function cashAccountsStatementsReducer(
  state: any = {},
  action: CashActionTypes
) {
  switch (action.type) {
    case POPULATE_CASH_ACCOUNT_STATEMENTS_ENTITIES:
      action.payload.forEach(cashAccount => {
        console.log(state[cashAccount.name]);
        state[cashAccount.name] = [];
      });
    default:
      return state;
  }
}
