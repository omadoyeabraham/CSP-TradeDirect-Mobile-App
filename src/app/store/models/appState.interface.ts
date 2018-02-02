import { IUserState } from "./userState.interface";
import { IStockBrokingState } from "./stockbrokingState.interface";
import { IFixedIncomeState } from "./fixedincomeState.interface";
import { ICashState } from "./cashState.interface";

/**
 * Interface which defines the contract that the redux store must adhere to, i.e. the data shape that the store must take
 *
 */
export interface IAppState {
  readonly user: IUserState;
  readonly stockbroking: IStockBrokingState;
  readonly fixedincome: IFixedIncomeState;
  readonly cash: ICashState;
}
