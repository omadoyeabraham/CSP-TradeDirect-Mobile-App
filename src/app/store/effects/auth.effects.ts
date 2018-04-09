import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { map, catchError, switchMap, tap } from "rxjs/operators";

import * as AuthActions from "../actions/auth/auth.actions";
import * as UserActions from "../actions/user/user.actions";
import * as ErrorActions from "../actions/errors/error.actions";
import * as StockbrokingPortfolioActions from "../actions/stockbroking/portfolios.actions";
import * as SecurityActions from "../actions/stockbroking/securities.actions";
import * as FixedIncomeActions from "../actions/fixedIncome/fixedIncome.actions";
import * as TradeOrderActions from "../actions/stockbroking/tradeOrder.actions";
import * as MarketDataActions from "../actions/stockbroking/marketdata.actions";
import * as CashAccountActions from "../actions/cash/cash.actions";
import * as SmaActions from "../actions/stockbroking/sma.actions";

import { AuthProvider } from "../../sharedModule/services/auth/auth";
import { TradeOrderProvider } from "../../stockbrokingModule/providers/trade-order/trade-order";
import { ITradeOrderTerm } from "../../stockbrokingModule/models/tradeOrderTerm.interface";
import { CashProvider } from "../../cashModule/provider/cash/cash";
import { ICashStatement } from "../../cashModule/models/cashStatement.interface";
import { saveCashAccountCashStatements } from "..";
import { IAppState } from "../models";
import { Store } from "@ngrx/store";

/**
 * Side effects for auth related actions. The side effects listen for @ngrx/store options and then carry-out various external (outside angular) actions
 */

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthProvider,
    private tradeOrderProvider: TradeOrderProvider,
    private cashProvider: CashProvider,
    private store: Store<IAppState>
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
          // if (!userData.STB.EXCHANGE) {
          //   userData.STB.EXCHANGE = [{}];
          //   userData.STB.EXCHANGE[0].portfolios = [];
          // }

          // if (!userData.STB.MANAGED) {
          //   userData.STB.MANAGED = [{}];
          //   userData.STB.MANAGED[0].portfolioHoldings = [];
          // }

          // Check to set sma holdings if user has no SMA
          if (!userData.STB.MANAGED[0]) {
            userData.STB.MANAGED.push({});
            userData.STB.MANAGED[0].portfolioHoldings = [];
          }

          // Set the investment type for regular fixed income investments
          userData.FI.NGN = userData.FI.NGN.map(investment => {
            investment.cspInvestmentType = "FixedIncome";
            return investment;
          });

          // Set the investment type for TBill fixed income investments
          userData.FI.TBills = userData.FI.TBills.map(investment => {
            investment.cspInvestmentType = "TreasuryBill";
            return investment;
          });
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
          new MarketDataActions.GetMarketData(),
          new CashAccountActions.saveCashAcccountsToStore(userData.CA),
          new CashAccountActions.saveActiveNairaCashAccountToStore(
            userData.CA.NGN[0]
          ),
          new CashAccountActions.saveActiveDollarCashAccountToStore(
            userData.CA.USD[0]
          ),
          new CashAccountActions.populateCashAccountStatementsEntities(
            userData.CA.NGN
          ),
          new CashAccountActions.populateCashAccountStatementsEntities(
            userData.CA.USD
          ),
          new SmaActions.saveSmaHoldings(
            userData.STB.MANAGED[0].portfolioHoldings
          ),
          new SmaActions.saveSmaFI(userData.FI.NGNSMA)
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

  /**
   * Side effects to get cash statements after authentication
   *
   * @memberof AuthEffects
   */
  @Effect({ dispatch: false })
  getCashStatements$ = this.actions$
    .ofType(CashAccountActions.POPULATE_CASH_ACCOUNT_STATEMENTS_ENTITIES)
    .pipe(
      map(
        (action: CashAccountActions.populateCashAccountStatementsEntities) =>
          action.payload
      ),
      map(cashAccounts => {
        // Get cash statements for all naira accounts
        cashAccounts.forEach(cashAccount => {
          this.cashProvider
            .getCashAccountStatements(cashAccount.name)
            .subscribe(
              response => {
                const responseData = response.body.item;

                /**
                 * Either a single object, or an array of objects will be returned.
                 * This ensures that we always have an array of objects
                 */
                let cashStatements: Array<ICashStatement> =
                  responseData.constructor === Array
                    ? responseData
                    : [responseData];

                // console.log(cashStatements);

                // Dispatch the action to update the cash statements for the selected cash account
                this.store.dispatch(
                  new saveCashAccountCashStatements({
                    cashAccountName: cashAccount.name,
                    statements: cashStatements
                  })
                );
              },
              err => console.log(err)
            );
        });
      })
    );
}
