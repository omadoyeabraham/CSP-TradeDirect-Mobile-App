import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { IAppState } from "../../models";

export const AUTHENTICATION_FAILED = "[Error] User authentication failed";

export class AuthenticationFailed implements Action {
  readonly type = AUTHENTICATION_FAILED;

  /**
   * Creates an instance of AuthenticationFailed.
   * @param {string} payload  This is the error message/reason why authentication failed
   * @memberof AuthenticationFailed
   */
  constructor(public payload: string) {}
}

/**
 * Class used to dispatch various error actions.
 *
 * @export
 * @class ErrorActionDispatcher
 */
@Injectable()
export class ErrorActionDispatcher {
  constructor(private store: Store<IAppState>) {}

  /**
   * Dispatch the "AuthenticationFailed" action
   *
   * @param {string} errorMessage
   * @memberof ErrorActionDispatcher
   */
  authenticationFailed(errorMessage: string = "Invalid username or password") {
    this.store.dispatch(new AuthenticationFailed(errorMessage));
  }
}

export type ErrorActionType = AuthenticationFailed;
