import {
  initialStockbrokingPortfolioState,
  initialStockbrokingActivePortfolioState,
  intialStbActivePortflioMetaData
} from "../../models/initialState";
import * as StbPortfolioActions from "../../actions/stockbroking/portfolios.actions";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";
import {
  IStockBrokingPortfolioState,
  IStbActivePortfolioMetaData
} from "../../models";
import { convertArrayToEntities } from "../../helpers";

export default function stbPortfolioReducer(
  state = initialStockbrokingPortfolioState,
  action: StbPortfolioActions.StbPortfolioActionType
): IStockBrokingPortfolioState {
  switch (action.type) {
    case StbPortfolioActions.SAVE_STB_PORTFOLIOS_IN_STORE:
      let portfolios: Array<IPortfolio> = action.payload;

      // Map over the portfolios to ensure that portfolioHoldings always has a value set
      portfolios = portfolios.map(portfolio => {
        if (!portfolio.portfolioHoldings) {
          portfolio.portfolioHoldings = [];
        }

        // calculate the gain or loss for all portfolios
        const gainOrLoss =
          parseFloat(portfolio.currentValuation.amount) -
          parseFloat(portfolio.costBasis.amount);
        portfolio.gainOrLoss = gainOrLoss;

        return portfolio;
      });

      const portfolioEntities = convertArrayToEntities(portfolios, "id", {});
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

/**
 * Reducer controlling the stbActivePortfolioMetaData slice of state
 *
 * @export
 * @param {IStbActivePortfolioMetaData} [state=intialStbActivePortflioMetaData]
 * @param {StbPortfolioActions.StbPortfolioActionType} action
 */
export function stbActivePortfolioMetaDataReducer(
  state: IStbActivePortfolioMetaData = intialStbActivePortflioMetaData,
  action: StbPortfolioActions.StbPortfolioActionType
): IStbActivePortfolioMetaData {
  //TODO: Add checks for null objects etc
  switch (action.type) {
    case StbPortfolioActions.SET_ACTIVE_PORTFOLIO_META_DATA: {
      const portfolio = action.payload;
      const totalValue = parseFloat(portfolio.currentValuation.amount);

      return {
        totalValue
      };
    }

    default:
      return state;
  }
}
