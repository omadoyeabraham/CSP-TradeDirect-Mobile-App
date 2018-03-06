import { ICashAccountInterface } from "../../cashModule/models/cashAccount.interface";

/**
 * Interface which defines the shape of the cash 'slice' of the redux store.
 *
 * @export
 * @interface ICashState
 */
export interface ICashState {
  NGN: Array<ICashAccountInterface>;
  USD: Array<ICashAccountInterface>;
}
