import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";

import * as AuthActions from "../actions/auth/auth.actions";
import * as UserActions from "../actions/user/user.actions";
import * as ErrorActions from "../actions/errors/error.actions";
import * as StockbrokingPortfolioActions from "../actions/stockbroking/portfolios.actions";
import * as SecurityActions from "../actions/stockbroking/securities.actions";
import * as FixedIncomeActions from "../actions/fixedIncome/fixedIncome.actions";

import { AuthProvider } from "../../sharedModule/services/auth/auth";

/**
 * Side effects for auth related actions. The side effects listen for @ngrx/store options and then carry-out various external (outside angular) actions
 */

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthProvider) {}

  /**
   * Side effect to occur when a user attempts to log in. This effect calls the authService and dispatches actions based on the response from the authService
   *
   * @memberof AuthEffects
   */
  //TODO: Perform checks and return defaults before dispatching actions
  @Effect()
  loginUser$ = this.actions$.ofType(AuthActions.LOGIN_USER).pipe(
    map((action: AuthActions.LoginUser) => action.payload),
    switchMap(credentials => {
      return this.authService
        .login(credentials)
        .pipe(
          map(userData => userData),
          switchMap(userData => [
            new AuthActions.LoginUserSuccess(userData),
            new UserActions.AddUserDataToStore(userData.customer),
            new StockbrokingPortfolioActions.SaveStbPortfoliosToStore(
              userData.STB.EXCHANGE
            ),
            new StockbrokingPortfolioActions.SetActivePortfolioInStore(
              userData.STB.EXCHANGE[0]
            ),
            new StockbrokingPortfolioActions.SetActivePortfolioMetaData(
              userData.STB.EXCHANGE[0]
            ),
            new SecurityActions.getSecurities(),
            new FixedIncomeActions.saveFixedIncomeData(userData.FI.NGN)
          ]),
          catchError(error => [
            new AuthActions.LoginUserFailed(),
            new ErrorActions.AuthenticationFailed(
              "Incorrect username or password"
            )
          ])
        );
    })
  );
}
