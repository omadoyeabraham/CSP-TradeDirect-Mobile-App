import { ISecurity } from "../../../stockbrokingModule/models";
import * as securityActions from "../../actions/stockbroking/securities.actions";

/**
 * Default reducer in this file, which returns the state slice that represents an array of all securities tradeable on the app
 *
 * @export
 * @param {Array<ISecurity>} [state=[]]
 * @param {securityActions.SecuritiesActionTypes} action
 * @returns {Array<ISecurity>}
 */
export default function securitiesReducer(
  state: Array<ISecurity> = [],
  action: securityActions.SecuritiesActionTypes
): Array<ISecurity> {
  switch (action.type) {
    case securityActions.SAVE_SECURITIES_IN_STORE: {
      return action.payload;
    }

    default:
      return state;
  }
}

/**
 * Reducer which returns the state slice that represents the selected security on the overview page
 *
 * @export
 * @param {ISecurity} [state={} as ISecurity]
 * @param {securityActions.SecuritiesActionTypes} action
 * @returns {ISecurity}
 */
export function selectedSecurityOnOverviewPageReducer(
  state: ISecurity = {} as ISecurity,
  action: securityActions.SecuritiesActionTypes
): ISecurity {
  switch (action.type) {
    case securityActions.SET_SELECTED_SECURITY_ON_OVERVIEW_PAGE:
      return action.payload;
    default:
      return state;
  }
}

/**
 * Reducer which returns the state slice that represents the market data of the currently selected security
 *
 * @export
 * @param {Object} [state={}]
 * @param {securityActions.SecuritiesActionTypes} action
 * @returns {Object}
 */
export function selectedSecurityMarketDataReducer(
  state: Object = {},
  action: securityActions.SecuritiesActionTypes
): Object {
  switch (action.type) {
    case securityActions.SAVE_SELECTED_SECURITY_ON_OVERVIEW_PAGE_MARKET_DATA_TO_STORE:
      return action.payload;
    default:
      return state;
  }
}
