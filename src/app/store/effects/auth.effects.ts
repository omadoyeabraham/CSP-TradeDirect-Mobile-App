import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";

import * as AuthActions from "../actions/auth/auth.actions";
import * as UserActions from "../actions/user/user.actions";
import * as ErrorActions from "../actions/errors/error.actions";
import * as StockbrokingPortfolioActions from "../actions/stockbroking/portfolios.actions";
import * as SecurityActions from "../actions/stockbroking/securities.actions";
import * as FixedIncomeActions from "../actions/fixedIncome/fixedIncome.actions";
import * as TradeOrderActions from "../actions/stockbroking/tradeOrder.actions";
import * as MarketDataActions from "../actions/stockbroking/marketdata.actions";

import { AuthProvider } from "../../sharedModule/services/auth/auth";
import { TradeOrderProvider } from "../../stockbrokingModule/providers/trade-order/trade-order";
import { ITradeOrderTerm } from "../../stockbrokingModule/models/tradeOrderTerm.interface";

/**
 * Side effects for auth related actions. The side effects listen for @ngrx/store options and then carry-out various external (outside angular) actions
 */

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthProvider,
    private tradeOrderProvider: TradeOrderProvider
  ) {}

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
      return this.authService.login(credentials).pipe(
        map(userData => {
          return userData;
        }),
        switchMap(userData => [
          new AuthActions.ResetAuthState(),
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
          new FixedIncomeActions.saveFixedIncomeData(
            userData.FI.NGN.concat(userData.FI.TBills)
          ),
          new FixedIncomeActions.saveFxInvestmentsData(userData.FI.USD),
          new TradeOrderActions.GetTradeOrderHistory(),
          new MarketDataActions.GetMarketData()
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

  /**
   * Side effect which gets other required data upon successful login.
   * Data required includes
   *  + TradeOrderTerms
   *
   * @memberof AuthEffects
   */
  @Effect()
  successfulLogin = this.actions$.ofType(AuthActions.LOGIN_USER_SUCCESS).pipe(
    map((action: AuthActions.LoginUserSuccess) => action),
    switchMap(action => {
      return this.tradeOrderProvider
        .getTradeOrderTerms()
        .pipe(
          map((tradeOrderTerms: Array<ITradeOrderTerm>) => tradeOrderTerms),
          switchMap(tradeOrderTerms => [
            new TradeOrderActions.SaveTradeOrderTermsInStore(tradeOrderTerms)
          ])
        );
    })
  );
}
