import {
  initialStockbrokingPortfolioState,
  initialStockbrokingActivePortfolioState
} from "../../models/initialState";
import * as StbPortfolioActions from "../../actions/stockbroking/portfolios.actions";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";
import { IStockBrokingPortfolioState } from "../../models";
import { convertArrayToEntities } from "../../helpers";

export default function stbPortfolioReducer(
  state = initialStockbrokingPortfolioState,
  action: StbPortfolioActions.StbPortfolioActionType
): IStockBrokingPortfolioState {
  switch (action.type) {
    case StbPortfolioActions.SAVE_STB_PORTFOLIOS_IN_STORE:
      const portfolioEntities = convertArrayToEntities(
        action.payload,
        "id",
        {}
      );
      return {
        ...portfolioEntities
      };
    default:
      return state;
  }
}

/**
 * Reducer which calculates state for the stbActiveportfolio slice of the store
 *
 * @export
 * @param {IPortfolio} [state=initialStockbrokingActivePortfolioState]
 * @param {StbPortfolioActions.StbPortfolioActionType} action
 * @returns
 */
export function stbActivePortfolioReducer(
  state: IPortfolio = initialStockbrokingActivePortfolioState,
  action: StbPortfolioActions.StbPortfolioActionType
) {
  switch (action.type) {
    case StbPortfolioActions.SET_ACTIVE_PORTFOLIO_IN_STORE:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
