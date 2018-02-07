import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IAppState } from "../models";

/**
 * Action type constants for all auth specific actions
 */
export const LOGIN_USER = "[User] Log the user into the application";
export const LOGIN_USER_FAILED = "[User] Login attempt failed";
export const LOGIN_USER_SUCCESS = "[User] Login successful";

// Action Creator for the LOGIN_USER action
export class LoginUser implements Action {
  readonly type = LOGIN_USER;
  constructor(public payload: any) {}
}

// Action Creator for the LOGIN_USER_FAILED action
export class LoginUserFailed implements Action {
  readonly type = LOGIN_USER_FAILED;
}

// Action Creator for the LOGIN_USER_SUCCESS action
export class LoginUserSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;
  constructor(public payload: any) {}
}

// Action types
export type AuthActionType = LoginUser | LoginUserFailed | LoginUserSuccess;

/**
 * Action Dispatchers for auth related actions.
 * The actions dispatched are constructed from the action creators defined above
 *
 * @export
 * @class UserAction
 */
@Injectable()
export class AuthActionDispatcher {
  constructor(private store: Store<IAppState>) {}

  /**
   * Dispatch the action for login
   *
   * @param {*} credentials
   * @memberof UserAction
   */
  loginUser(credentials: any) {
    this.store.dispatch(new LoginUser(credentials));
  }

  /**
   * Dispatch the action for when a login fails
   *
   * @memberof AuthActionDispatcher
   */
  loginUserFailed() {
    this.store.dispatch(new LoginUserFailed());
  }

  /**
   * Dispatch the action for when a login is successfull
   *
   * @param {*} payload
   * @memberof AuthActionDispatcher
   */
  loginUserSuccess(payload: any) {
    this.store.dispatch(new LoginUserSuccess(payload));
  }
}
