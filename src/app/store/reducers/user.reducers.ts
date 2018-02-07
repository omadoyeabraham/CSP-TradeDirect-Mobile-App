import { Action } from "@ngrx/store";

import * as userActions from "../actions/auth.actions";
import * as fromStoreModels from "../models/index";
import initialState from "../models/initialState";

export default function userReducer(
  state: fromStoreModels.IUserState = initialState.intialUserState,
  action: Action
): fromStoreModels.IUserState {
  switch (action.type) {
    case userActions.LOGIN_USER:
      return {
        ...state,
        isAuthenticating: true
      };
    case userActions.LOGIN_USER_SUCCESS:
      console.log("from user reducer login success");
      console.log(action);
      return state;
    default:
      return state;
  }
}
