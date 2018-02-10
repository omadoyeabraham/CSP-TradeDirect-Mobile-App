import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IErrorState } from "../../models/index";

/**
 * Selectors are pure functions (fns that do not mutate any variable, data or state outside their lexical scope) which take a slice of state as input and return some state data (possibly formatted) that we can return to components
 */

/**
 * createFeatureSelector returns a selector fn that looks up and returns the specified feature state. In this case the selector returned by getErrorState will return the error slice of state which has the shape of IErrorState
 */
export const getErrorState = createFeatureSelector<IErrorState>("error");

export const getAuthenticationErrorMessage = createSelector(
  getErrorState,
  (state: IErrorState) => state.authenticationErrorMessage
);
