import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IAppState } from "../../models";

import * as AuthActions from "../../actions/auth/auth.actions";
import * as UserActions from "../../actions/user/user.actions";
import * as ErrorActions from "../../actions/errors/error.actions";
import * as StockbrokingPortfolioActions from "../../actions/stockbroking/portfolios.actions";
import * as SecurityActions from "../../actions/stockbroking/securities.actions";
import * as FixedIncomeActions from "../../actions/fixedIncome/fixedIncome.actions";
import * as TradeOrderActions from "../../actions/stockbroking/tradeOrder.actions";
import * as MarketDataActions from "../../actions/stockbroking/marketdata.actions";
import * as CashAccountActions from "../../actions/cash/cash.actions";
import * as SmaActions from "../../actions/stockbroking/sma.actions";
import { IPortfolio } from "../../../stockbrokingModule/models";

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

  /**
   * Save the users data to the store and perform the necessary actions upon successful authentication
   *
   * @param {any} userData
   * @memberof AuthActionDispatcher
   */
  saveUserDataToStore(userData) {
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

    this.store.dispatch(new AuthActions.LoginUserSuccess(userData));
    this.store.dispatch(new UserActions.AddUserDataToStore(userData.customer));
    this.store.dispatch(
      new StockbrokingPortfolioActions.SaveStbPortfoliosToStore(
        userData.STB.EXCHANGE
      )
    );
    this.store.dispatch(
      new StockbrokingPortfolioActions.SetActivePortfolioInStore(
        userData.STB.EXCHANGE[0]
      )
    );
    this.store.dispatch(
      new StockbrokingPortfolioActions.SetActivePortfolioMetaData(
        userData.STB.EXCHANGE[0]
      )
    );
    this.store.dispatch(new SecurityActions.getSecurities());
    this.store.dispatch(
      new FixedIncomeActions.saveFixedIncomeData(
        userData.FI.NGN.concat(userData.FI.TBills)
      )
    );
    this.store.dispatch(
      new FixedIncomeActions.saveFxInvestmentsData(userData.FI.USD)
    );
    this.store.dispatch(new TradeOrderActions.GetTradeOrderHistory());

    this.store.dispatch(new MarketDataActions.GetMarketData());
    this.store.dispatch(
      new CashAccountActions.saveCashAcccountsToStore(userData.CA)
    );
    this.store.dispatch(
      new CashAccountActions.saveActiveNairaCashAccountToStore(
        userData.CA.NGN[0]
      )
    );
    this.store.dispatch(
      new CashAccountActions.saveActiveDollarCashAccountToStore(
        userData.CA.USD[0]
      )
    );
    this.store.dispatch(
      new CashAccountActions.populateCashAccountStatementsEntities(
        userData.CA.NGN
      )
    );
    this.store.dispatch(
      new CashAccountActions.populateCashAccountStatementsEntities(
        userData.CA.USD
      )
    );
    this.store.dispatch(
      new SmaActions.saveSmaHoldings(userData.STB.MANAGED[0].portfolioHoldings)
    );
    this.store.dispatch(new SmaActions.saveSmaFI(userData.FI.NGNSMA));
  }

  /**
   * Update the user's info in the store
   *
   * @param {any} userData
   * @param {number} activePortfolioID
   * @memberof AuthActionDispatcher
   */
  updateUserDataInStore(userData, activePortfolioID) {
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

    // Get the active portfolio data (filtered from all portfolios), so the store can be updated
    const activePortfolio = userData.STB.EXCHANGE.filter(
      (portfolio: IPortfolio) => {
        return portfolio.id === activePortfolioID;
      }
    )[0];

    this.store.dispatch(new MarketDataActions.GetMarketData());
    this.store.dispatch(new SecurityActions.getSecurities());
    this.store.dispatch(
      new StockbrokingPortfolioActions.SaveStbPortfoliosToStore(
        userData.STB.EXCHANGE
      )
    );
    this.store.dispatch(
      new StockbrokingPortfolioActions.SetActivePortfolioInStore(
        activePortfolio
      )
    );
    this.store.dispatch(
      new StockbrokingPortfolioActions.SetActivePortfolioMetaData(
        activePortfolio
      )
    );
    this.store.dispatch(
      new FixedIncomeActions.saveFixedIncomeData(
        userData.FI.NGN.concat(userData.FI.TBills)
      )
    );
    this.store.dispatch(
      new FixedIncomeActions.saveFxInvestmentsData(userData.FI.USD)
    );
    this.store.dispatch(
      new CashAccountActions.saveCashAcccountsToStore(userData.CA)
    );
    this.store.dispatch(
      new CashAccountActions.saveActiveNairaCashAccountToStore(
        userData.CA.NGN[0]
      )
    );
    this.store.dispatch(
      new CashAccountActions.saveActiveDollarCashAccountToStore(
        userData.CA.USD[0]
      )
    );
    this.store.dispatch(
      new CashAccountActions.populateCashAccountStatementsEntities(
        userData.CA.NGN
      )
    );
    this.store.dispatch(
      new CashAccountActions.populateCashAccountStatementsEntities(
        userData.CA.USD
      )
    );
    this.store.dispatch(
      new SmaActions.saveSmaHoldings(userData.STB.MANAGED[0].portfolioHoldings)
    );
    this.store.dispatch(new SmaActions.saveSmaFI(userData.FI.NGNSMA));
  }
}
