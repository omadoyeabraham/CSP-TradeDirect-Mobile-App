import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";
import { IAppState } from "../../models/index";

export const SAVE_STB_PORTFOLIOS_IN_STORE =
  "[STB] [PORTFOLIOS] Save the user's stb portfolio(s) in the store";
export const SET_ACTIVE_PORTFOLIO_IN_STORE =
  "[STB] [Active Portfolio] Set the currently active portfolio in the store";
export const SET_ACTIVE_PORTFOLIO_META_DATA =
  "[STB] [Active Portfolio Meta Data] Calculate various metadata for the currently selected portfolio";

// Action creator class for saving stb portfolios to the store
export class SaveStbPortfoliosToStore implements Action {
  readonly type = SAVE_STB_PORTFOLIOS_IN_STORE;
  constructor(public payload: IPortfolio[]) {}
}

// Action creator class for setting the active portfolio
export class SetActivePortfolioInStore implements Action {
  readonly type = SET_ACTIVE_PORTFOLIO_IN_STORE;
  constructor(public payload: IPortfolio) {}
}

// Action creator class for setting the active portfolio metadata
export class SetActivePortfolioMetaData implements Action {
  readonly type = SET_ACTIVE_PORTFOLIO_META_DATA;
  constructor(public payload: IPortfolio) {}
}

// Action Types
export type StbPortfolioActionType =
  | SaveStbPortfoliosToStore
  | SetActivePortfolioInStore
  | SetActivePortfolioMetaData;

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

  /**
   * Dispatch the action to set the active portfolio in the store
   *
   * @param {IPortfolio} payload
   * @memberof StbPortfolioActionDispatcher
   */
  setActivePortfolioInStore(payload: IPortfolio) {
    this.store.dispatch(new SetActivePortfolioInStore(payload));
  }

  /**
   * Set various metadata (total value, index in all portfolios e.t.c) for the active portfolio
   *
   * @param {IPortfolio} payload
   * @memberof StbPortfolioActionDispatcher
   */
  setActivePortfolioMetaData(payload: IPortfolio) {
    this.store.dispatch(new SetActivePortfolioMetaData(payload));
  }
}
