import { Action } from "@ngrx/store";

import * as authActions from "../actions/auth.actions";
import * as fromStoreModels from "../models";
import initialState from "../models/initialState";

export default function authReducer(
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
      return {
        ...state,
        isAuthenticating: false,
        authenticated: true
      };
    case authActions.LOGIN_USER_FAILED:
      return {
        ...state,
        isAuthenticating: false
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
