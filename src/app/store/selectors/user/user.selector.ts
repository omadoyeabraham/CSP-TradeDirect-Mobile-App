import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserState } from "../../models/index";

/**
 * Selectors are pure functions (fns that do not mutate any variable, data or state outside their lexical scope) which take a slice of state as input and return some state data (possibly formatted) that we can return to components
 */

/**
 * createFeatureSelector returns a selector fn that looks up and returns the specified feature state. In this case the selector returned by getUserState will return the user slice of state which has the shape of IUserState
 */
export const getUserState = createFeatureSelector<IUserState>("user");

/**
 * Get the authentication token for the user, this token is required to access protected API resources
 */
export const getAuthenticationToken = createSelector(
  getUserState,
  (state: IUserState) => {
    const token = state.portalPasswordToken ? state.portalPasswordToken : "";
    return token;
  }
);
