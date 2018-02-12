import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";
import { IAppState } from "../../models/index";

export const SAVE_STB_PORTFOLIOS_IN_STORE =
  "[STB] [PORTFOLIOS] Save the user's stb portfolio(s) in the store";

// Action creator class for saving stb portfolios to the store
export class SaveStbPortfoliosToStore implements Action {
  readonly type = SAVE_STB_PORTFOLIOS_IN_STORE;
  constructor(public payload: IPortfolio[]) {}
}

// Action Types
export type StbPortfolioActionType = SaveStbPortfoliosToStore;

/**
 * Action Dispatchers for stb portfolio related actions.
 * The actions dispatched are constructed from the action creators defined above
 *
 * @export
 * @class StbPortfolioActionDispatcher
 */
@Injectable()
export class StbPortfolioActionDispatcher {
  constructor(private store: Store<IAppState>) {}

  /**
   * Dispatch the action to save portfolios to store
   *
   * @param {IPortfolio[]} payload
   * @memberof StbPortfolioActionDispatcher
   */
  savePortfoliosToStore(payload: IPortfolio[]) {
    this.store.dispatch(new SaveStbPortfoliosToStore(payload));
  }
}
