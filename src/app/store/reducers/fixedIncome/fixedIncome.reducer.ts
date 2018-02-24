import { IFixedIncomeInvestment } from "../../../fixedIncomeModule/models";
import {
  FixedIncomeActionType,
  SAVE_FIXED_INCOME_DATA,
  SAVE_FX_INVESTMENTS_DATA
} from "../../actions/fixedIncome/fixedIncome.actions";

export default function fixedIncomeReducer(
  state: Array<IFixedIncomeInvestment> = [],
  action: FixedIncomeActionType
) {
  switch (action.type) {
    case SAVE_FIXED_INCOME_DATA:
      return action.payload;
    default:
      return state;
  }
}

export function fxInvestmentsReducer(
  state: Array<IFixedIncomeInvestment> = [],
  action: FixedIncomeActionType
) {
  switch (action.type) {
    case SAVE_FX_INVESTMENTS_DATA:
      return action.payload;
    default:
      return state;
  }
}
