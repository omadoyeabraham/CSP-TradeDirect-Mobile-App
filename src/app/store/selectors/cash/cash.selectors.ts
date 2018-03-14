import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICashState } from "../../models";
import { ICashAccountInterface } from "../../../cashModule/models/cashAccount.interface";

export const getCashAccounts = createFeatureSelector("cashAccounts");

/**
 * Get the naira cash accounts owned by the user
 */
export const getNairaCashAccounts = createSelector(
  getCashAccounts,
  (cashAccounts: ICashState) => {
    return cashAccounts.NGN;
  }
);

/**
 * Get the usd cash accounts owned by the user
 */
export const getDollarCashAccounts = createSelector(
  getCashAccounts,
  (cashAccounts: ICashState) => {
    return cashAccounts.USD;
  }
);

/**
 * Get the currently active naira cash account
 */
export const getActiveNairaCashAccount = createFeatureSelector<
  ICashAccountInterface
>("cashActiveNairaAccount");
