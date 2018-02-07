import { Action } from "@ngrx/store";

import * as authActions from "../actions/auth.actions";
import * as fromStoreModels from "../models";
import initialState from "../models/initialState";

export default function userReducer(
  state: fromStoreModels.IAuthState = initialState.initialAuthState,
  action: Action
): fromStoreModels.IAuthState {
  switch (action.type) {
    case authActions.LOGIN_USER:
      return {
        ...state,
        isAuthenticating: true
      };
    case authActions.LOGIN_USER_SUCCESS:
      console.log(action);
      return state;
    case authActions.LOGIN_USER_FAILED:
      console.log(action);
      return state;
    default:
      return state;
  }
}
