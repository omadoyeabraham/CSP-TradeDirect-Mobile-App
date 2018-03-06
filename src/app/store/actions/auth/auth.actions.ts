import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IAppState } from "../../models";

/**
 * Action type constants for all auth specific actions
 */
export const LOGIN_USER = "[Auth] Log the user into the application";
export const LOGIN_USER_FAILED = "[Auth] Login attempt failed";
export const LOGIN_USER_SUCCESS = "[Auth] Login successful";
export const RESET_AUTH_STATE = "[Auth] Reset the authentication state";
export const LOGOUT = "[Auth] Logout the user";

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

export class ResetAuthState implements Action {
  readonly type = RESET_AUTH_STATE;
  constructor() {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() {}
}

// Action types
export type AuthActionType =
  | LoginUser
  | LoginUserFailed
  | LoginUserSuccess
  | ResetAuthState
  | Logout;

/**
 * Action Dispatchers for auth related actions.
 * The actions dispatched are constructed from the action creators defined above
 *
 * @export
 * @class AuthActionDispatcher
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

  resetAuthState() {
    this.store.dispatch(new ResetAuthState());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
