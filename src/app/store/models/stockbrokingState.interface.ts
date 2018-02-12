import { IPortfolio } from "../../stockbrokingModule/models/portfolio.interface";

/**
 * Interface which defines the shape of the stockbroking 'slice' of the redux store.
 *
 * @export
 * @interface IStockBrokingState
 */
export interface IStockBrokingState {
  portfolios: IPortfolio[];
}
