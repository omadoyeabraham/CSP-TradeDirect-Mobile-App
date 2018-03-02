import { IPortfolio } from "../../stockbrokingModule/models/portfolio.interface";

export interface IStockBrokingPortfolioState {
  [id: string]: IPortfolio;
  [id: number]: IPortfolio;
}

export interface IStbActivePortfolioMetaData {
  totalValue: number;
}

export interface ITradeOrderCancellationState {
  isCancelling: boolean;
  cancelledSuccessfully: boolean;
  cancellationFailed: boolean;
}

/**
 * Interface which defines the shape of the stockbroking 'slice' of the redux store.
 *
 * @export
 * @interface IStockBrokingState
 */
export interface IStockBrokingState {
  portfolios: { [id: number]: IPortfolio };
}
