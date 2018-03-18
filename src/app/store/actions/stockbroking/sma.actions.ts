import { Action } from "@ngrx/store";

import { IPortfolioHolding } from "../../../stockbrokingModule/models";
import { IFixedIncomeInvestment } from "../../../fixedIncomeModule/models";

export const SAVE_SMA_HOLDINGS = "[SMA] Save the sma holdings to the store";
export const SAVE_SMA_FI =
  "[SMA] Save sma fixed income investments to the store";

export class saveSmaHoldings implements Action {
  readonly type = SAVE_SMA_HOLDINGS;
  constructor(public payload: IPortfolioHolding[]) {}
}

export class saveSmaFI implements Action {
  readonly type = SAVE_SMA_FI;
  constructor(public payload: IFixedIncomeInvestment[]) {}
}

export type SmaActionTypes = saveSmaHoldings | saveSmaFI;
