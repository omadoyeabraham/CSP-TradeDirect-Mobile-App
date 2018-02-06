import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { mergeMap } from "rxjs/operators";

import * as UserActions from "../actions/user.actions";
import { AuthProvider } from "../../sharedModule/services/auth/auth";
import { UserActionDispatcher } from "../index";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";

/**
 * Side effects for auth related actions. The side effects listen for @ngrx/store options and then carry-out various external (outside angular) actions
 */

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthProvider,
    private userActionDispatcher: UserActionDispatcher
  ) {}

  @Effect()
  loginUser$: Observable<Action> = this.actions$.ofType(UserActions.LOGIN_USER);
}
