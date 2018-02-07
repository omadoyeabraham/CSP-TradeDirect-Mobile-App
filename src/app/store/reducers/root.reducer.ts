import { ActionReducerMap } from "@ngrx/store";

import authReducer from "./auth.reducers";
import { IAppState, IAuthState } from "../models/index";

// Interface describing the shape of our root reducer
export interface IRootReducer {
  auth: IAuthState;
}

/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */
export const rootReducer: ActionReducerMap<IRootReducer> = {
  auth: authReducer
};
