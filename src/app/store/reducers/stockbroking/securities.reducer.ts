import { ISecurity } from "../../../stockbrokingModule/models";
import * as securityActions from "../../actions/stockbroking/securities.actions";

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
