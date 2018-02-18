import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IFixedIncomeInvestment } from "../../../fixedIncomeModule/models";
import { IAppState } from "../../models";

// Action types
export const SAVE_FIXED_INCOME_DATA =
  "[FixedIncome] Save the fixed income data into the store ";
export const SAVE_FX_INVESTMENTS_DATA =
  "[FixedIncome] Save the fixed income investments data into the store ";

// Action creators
export class saveFixedIncomeData implements Action {
  readonly type = SAVE_FIXED_INCOME_DATA;
  constructor(public payload: Array<IFixedIncomeInvestment>) {}
}

export class saveFxInvestmentsData implements Action {
  readonly type = SAVE_FX_INVESTMENTS_DATA;
  constructor(public payload: Array<IFixedIncomeInvestment>) {}
}

export type FixedIncomeActionType = saveFixedIncomeData | saveFxInvestmentsData;

/**
 * Action dispatcher class for fixed income actions
 *
 * @export
 * @class FixedIncomeActionDispatcher
 */
@Injectable()
export class FixedIncomeActionDispatcher {
  constructor(public store: Store<IAppState>) {}

  /**
   * Dispatch the action to save the user's fixed income data to the store
   *
   * @param {Array<IFixedIncomeInvestment>} payload
   * @memberof FixedIncomeActionDispatcher
   */
  saveFixedIncomeData(payload: Array<IFixedIncomeInvestment>) {
    this.store.dispatch(new saveFixedIncomeData(payload));
  }

  /**
   * Dispatch the action to save the user's fx investment data to the store
   *
   * @param {Array<IFixedIncomeInvestment>} payload
   * @memberof FixedIncomeActionDispatcher
   */
  saveFxInvestmentsData(payload: Array<IFixedIncomeInvestment>) {
    this.store.dispatch(new saveFxInvestmentsData(payload));
  }
}
