import { initialStockbrokingPortfolioState } from "../../models/initialState";
import * as StbPortfolioActions from "../../actions/stockbroking/portfolios.actions";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";

export function stbPortfolioReducer(
  state = initialStockbrokingPortfolioState,
  action: StbPortfolioActions.StbPortfolioActionType
): IPortfolio[] {
  switch (action.type) {
    case StbPortfolioActions.SAVE_STB_PORTFOLIOS_IN_STORE:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
