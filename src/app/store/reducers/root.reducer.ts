import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { storageSync } from "ngrx-store-ionic-storage";

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

/**
 * Function to be called when a syncing error occurs between the store and local storage.
 *
 * @param err
 */
export const onSyncError = err => {
  console.group();
  console.log("AN ERROR OCCURED WHILE SYNCING STATE TO LOCAL STORAGE");
  console.log(err);
  console.groupEnd();
};

// Configuration for ngrx-store-ionic-storage
// TODO remove auth from the keys
export const storageSyncReducer = storageSync({
  // keys: ["auth", "user", "error"],
  hydratedStateKey: "hydrated", // Add this key to the state
  onSyncError: onSyncError // If a sync fails
});

/**
 * MetaReducer used to sync the store to localstorage
 *
 */
export function storageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any, any> {
  return storageSyncReducer(reducer);
}

// MetaReducers array used in app.module.ts
export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];
