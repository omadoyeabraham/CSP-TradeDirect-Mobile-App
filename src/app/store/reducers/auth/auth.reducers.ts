import { Action } from "@ngrx/store";

import * as authActions from "../../actions/auth/auth.actions";
import * as fromStoreModels from "../../models";
import initialState from "../../models/initialState";

export default function authReducer(
  state: fromStoreModels.IAuthState = initialState.initialAuthState,
  action: Action
): fromStoreModels.IAuthState {
  switch (action.type) {
    case authActions.LOGIN_USER:
      return {
        ...state,
        isAuthenticating: true,
        failedAuthAttempts: 0
      };
    case authActions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        failedAuthAttempts: 0,
        isAuthenticating: false,
        authenticated: true
      };
    case authActions.LOGIN_USER_FAILED:
      const noOfFailedAuthAttempts = state.failedAuthAttempts;

      return {
        ...state,
        isAuthenticating: false,
        authenticated: false,
        failedAuthAttempts: noOfFailedAuthAttempts + 1
      };

    case authActions.RESET_AUTH_STATE:
      return {
        ...state,
        // isAuthenticating: false,
        authenticated: false
        // failedAuthAttempts: 0
      };
    default:
      return state;
  }
}

/**
 * Selectors for the auth slice of state
 */

export const getAuthenticatedStatus = (state: fromStoreModels.IAuthState) =>
  state.authenticated;
export const getAuthIsAuthenticating = (state: fromStoreModels.IAuthState) =>
  state.isAuthenticating;
