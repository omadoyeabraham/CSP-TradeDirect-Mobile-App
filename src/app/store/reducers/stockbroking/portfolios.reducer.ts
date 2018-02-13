import { initialStockbrokingPortfolioState } from "../../models/initialState";
import * as StbPortfolioActions from "../../actions/stockbroking/portfolios.actions";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";

export default function stbPortfolioReducer(
  state = initialStockbrokingPortfolioState,
  action: StbPortfolioActions.StbPortfolioActionType
): Array<IPortfolio> {
  switch (action.type) {
    case StbPortfolioActions.SAVE_STB_PORTFOLIOS_IN_STORE:
      console.log("Called -");
      console.log(action);
      return [...action.payload];
    default:
      return state;
  }
}
