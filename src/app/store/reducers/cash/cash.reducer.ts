import {
  CashActionTypes,
  SAVE_CASH_ACCOUNTS_TO_STORE,
  SAVE_ACTIVE_NAIRA_CASH_ACCOUNT,
  POPULATE_CASH_ACCOUNT_STATEMENTS_ENTITIES,
  SAVE_CASH_ACCOUNT_CASH_STATEMENTS,
  SAVE_ACTIVE_DOLLAR_CASH_ACCOUNT
} from "../..";
import { ICashState } from "../../models";
import { ICashAccountInterface } from "../../../cashModule/models/cashAccount.interface";
import { ICashStatement } from "../../../cashModule/models/cashStatement.interface";

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

export function selectedDollarCashAccountReducer(
  state: ICashAccountInterface = {} as ICashAccountInterface,
  action: CashActionTypes
): ICashAccountInterface {
  switch (action.type) {
    case SAVE_ACTIVE_DOLLAR_CASH_ACCOUNT:
      return action.payload;

    default:
      return state;
  }
}

/**
 * Reducer for the cashAccountsStatementsEntities slice of state.
 * This slice of state represents the cash statements for various cash accounts in the following format
 *
 * {
 *    "cashAccountName": Array<ICashStatement>,
 *    "anotherCashAccountName": Array<ICashStatement>,
 * }
 *
 * @export
 * @param {*} [state={}]
 * @param {CashActionTypes} action
 * @returns
 */
export function cashAccountsStatementsReducer(
  state: any = {},
  action: CashActionTypes
) {
  switch (action.type) {
    case POPULATE_CASH_ACCOUNT_STATEMENTS_ENTITIES:
      action.payload.forEach(cashAccount => {
        state[cashAccount.name] = [] as Array<ICashStatement>;
      });
      return state;

    case SAVE_CASH_ACCOUNT_CASH_STATEMENTS:
      state[action.payload.cashAccountName] = action.payload.statements;
      return state;

    default:
      return state;
  }
}
