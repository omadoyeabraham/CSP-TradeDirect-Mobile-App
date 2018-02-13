import * as errorActions from "../../actions/errors/error.actions";
import { IErrorState } from "../../models";
import { initialErrorState } from "../../models/initialState";

export default function errorReducer(
  state: IErrorState = initialErrorState,
  action: errorActions.ErrorActionType
): IErrorState {
  switch (action.type) {
    case errorActions.AUTHENTICATION_FAILED:
      return {
        ...state,
        authenticationErrorMessage: action.payload
      };

    default:
      return state;
  }
}
