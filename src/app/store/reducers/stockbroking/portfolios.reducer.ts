import { initialStockbrokingPortfolioState } from "../../models/initialState";
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
