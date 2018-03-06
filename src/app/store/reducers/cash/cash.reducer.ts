import { CashActionTypes, SAVE_CASH_ACCOUNTS_TO_STORE } from "../..";
import { ICashState } from "../../models";

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
