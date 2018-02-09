import { ActionReducerMap } from "@ngrx/store";

import authReducer from "./auth/auth.reducers";
import userReducer from "./user/user.reducer";
import { IAuthState, IUserState } from "../models/index";

// Interface describing the shape of our root reducer
export interface IRootReducer {
  auth: IAuthState;
  user: IUserState;
}

/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */
export const rootReducer: ActionReducerMap<IRootReducer> = {
  auth: authReducer,
  user: userReducer
};
