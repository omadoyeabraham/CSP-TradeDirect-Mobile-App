import * as fromSharedModels from "./index";

/**
 * Interface which defines the contract that the redux store must adhere to, i.e. the data shape that the store must take
 *
 */
export interface IAppState {
  readonly user: fromSharedModels.IUserState;
  readonly stockbroking: fromSharedModels.IStockBrokingState;
  readonly fixedincome: fromSharedModels.IFixedIncomeState;
  readonly cash: fromSharedModels.ICashState;
}
