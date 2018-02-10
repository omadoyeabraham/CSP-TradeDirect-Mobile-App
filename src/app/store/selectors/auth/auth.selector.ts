import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from "../../models/index";

/**
 * Selectors are pure functions (fns that do not mutate any variable, data or state outside their lexical scope) which take a slice of state as input and return some state data (possibly formatted) that we can return to components
 */

/**
 * createFeatureSelector returns a selector fn that looks up and returns the specified feature state. In this case the selector returned by getAuthState will return the auth slice of state which has the shape of IAuthState
 */
export const getAuthState = createFeatureSelector<IAuthState>("auth");

const _userIsAuthenticated = (state: IAuthState) => state.authenticated;
const _userIsAuthenticating = (state: IAuthState) => state.isAuthenticating;
const _getNoOfFailedAuthAttempts = (state: IAuthState) =>
  state.failedAuthAttempts;

/**
 * Determine if the user is authenticated or not
 *
 * @param {selectorFn} getAuthState
 * @param {fn} Callback function which selects the authenticated property from the auth state tree
 * @returns boolean
 */
export const userIsAuthenticated = createSelector(
  getAuthState,
  _userIsAuthenticated
);

/**
 * Determine if the user is being authenticated or not
 *
 * @param {selectorFn} getAuthState
 * @param {fn} Callback function which selects the isAuthenticating property from the auth state tree
 * @returns boolean
 */
export const userIsAuthenticating = createSelector(
  getAuthState,
  _userIsAuthenticating
);

/**
 * Get the number of failed auth attempts
 *
 * @param {selectorFn} getAuthState
 * @param {fn} Callback function which selects the failedAuthAttempts property from the auth state tree
 * @returns number
 */
export const numberOfFailedAuthAttempts = createSelector(
  getAuthState,
  _getNoOfFailedAuthAttempts
);
