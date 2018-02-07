import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";

import * as AuthActions from "../actions/auth.actions";
import { AuthProvider } from "../../sharedModule/services/auth/auth";
import { Action } from "@ngrx/store";
import { of } from "rxjs/observable/of";

/**
 * Side effects for auth related actions. The side effects listen for @ngrx/store options and then carry-out various external (outside angular) actions
 */

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthProvider) {}

  /**
   *
   *
   * @memberof AuthEffects
   */
  // @Effect()
  // loginUser$ = this.actions$.ofType(AuthActions.LOGIN_USER).pipe(
  //   switchMap(action => {
  //     return this.authService
  //       .login(action.payload.username, action.payload.password)
  //       .pipe(
  //         map(userData => new AuthActions.LoginUserSuccess(userData)),
  //         catchError(error => of(new AuthActions.LoginUserFailed()))
  //       );
  //   })
  // );

  @Effect()
  loginUser$ = this.actions$.ofType(AuthActions.LOGIN_USER).pipe(
    map((action: AuthActions.LoginUser) => action.payload),
    switchMap(credentials => {
      return this.authService
        .login(credentials)
        .pipe(
          map(userData => new AuthActions.LoginUserSuccess(userData)),
          catchError(error => of(new AuthActions.LoginUserFailed()))
        );
    })
  );
}
