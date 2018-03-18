import { IPortfolioHolding } from "../../../stockbrokingModule/models";
import * as smaActions from "../../actions/stockbroking/sma.actions";
import { IFixedIncomeInvestment } from "../../../fixedIncomeModule/models";

/**
 * Reducer handling the smaHoldings slice of state
 *
 * @export
 * @param {IPortfolioHolding[]} state
 * @param {smaActions.SmaActionTypes} action
 * @returns {IPortfolioHolding[]}
 */
export default function smaReducer(
  state: IPortfolioHolding[],
  action: smaActions.SmaActionTypes
): IPortfolioHolding[] {
  switch (action.type) {
    case smaActions.SAVE_SMA_HOLDINGS:
      return action.payload;
    default:
      return state;
  }
}

/**
 * Reducer handling the smaFI slice of state
 *
 * @export
 * @param {IFixedIncomeInvestment[]} state
 * @param {smaActions.SmaActionTypes} action
 * @returns {IFixedIncomeInvestment[]}
 */
export function smaFiReducer(
  state: IFixedIncomeInvestment[],
  action: smaActions.SmaActionTypes
): IFixedIncomeInvestment[] {
  switch (action.type) {
    case smaActions.SAVE_SMA_FI:
      return action.payload;
    default:
      return state;
  }
}
