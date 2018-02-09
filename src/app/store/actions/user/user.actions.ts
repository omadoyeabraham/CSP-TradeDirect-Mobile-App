import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IAppState, IUserState } from "../../models";

export const ADD_USER_DATA_TO_STORE =
  "[User] Add the authenticated user's data to the store";

// Action creator for the ADD_USER_DATA_TO_STORE_ACTION
export class AddUserDataToStore implements Action {
  readonly type = ADD_USER_DATA_TO_STORE;
  constructor(public payload: IUserState) {}
}

// Action types
export type UserActionType = AddUserDataToStore;

/**
 * Action creators for User Actions.
 * These actions are created using the action classes defined above.
 *
 * @export
 * @class UserActionDispatcher
 */
@Injectable()
export class UserActionDispatcher {
  constructor(private store: Store<IAppState>) {}

  /**
   * Create a new "AddUserDataToStore" action and dispatch it.
   *
   * @param {IUserState} payload
   * @memberof UserActionDispatcher
   */
  addUserDataToStore(payload: IUserState) {
    this.store.dispatch(new AddUserDataToStore(payload));
  }
}
