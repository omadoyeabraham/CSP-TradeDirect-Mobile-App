import { ActionReducerMap } from "@ngrx/store";

import authReducer from "./auth/auth.reducers";
import userReducer from "./user/user.reducer";
import errorReducer from "./error/error.reducer";
import { IAuthState, IUserState, IErrorState } from "../models/index";

// Interface describing the shape of our root reducer
export interface IRootReducer {
  auth: IAuthState;
  user: IUserState;
  error: IErrorState;
}

/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */
export const rootReducer: ActionReducerMap<IRootReducer> = {
  auth: authReducer,
  user: userReducer,
  error: errorReducer
};
