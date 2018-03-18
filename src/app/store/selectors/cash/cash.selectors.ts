import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as moment from "moment";

import { ICashState } from "../../models";
import { ICashAccountInterface } from "../../../cashModule/models/cashAccount.interface";
import { ICashStatement } from "../../../cashModule/models/cashStatement.interface";

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

/**
 * Get the "cashAccountStatementsEntities" slice of state
 */
export const getCashAccountStatementsEntities = createFeatureSelector<any>(
  "cashAccountStatementsEntities"
);

/**
 * Get metadata for each cash statement, like transaction type, and transaction amount
 * @param cashStatements
 */
const calculateCashStatementMetaData = (
  cashStatements: ICashStatement[]
): ICashStatement[] => {
  cashStatements = cashStatements.map(statement => {
    if (parseFloat(statement.creditAmount) > 0) {
      statement.transactionType = "CREDIT";
      statement.transactionAmount = statement.creditAmount;
    } else if (parseFloat(statement.debitAmount) > 0) {
      statement.transactionType = "DEBIT";
      statement.transactionAmount = statement.debitAmount;
    } else {
      statement.transactionType = "OPENING_BALANCE";
      statement.transactionAmount = statement.debitAmount;
    }

    return statement;
  });

  return cashStatements;
};

/**
 * Return the cash statements for the selected naira cash account
 */
export const getSelectedNairaCashAccountCashStatements = createSelector(
  getActiveNairaCashAccount,
  getCashAccountStatementsEntities,
  (
    activeNairaCashAccount: ICashAccountInterface,
    cashAccountStatementsEntities: any
  ) => {
    let cashStatements: ICashStatement[] =
      cashAccountStatementsEntities[activeNairaCashAccount.name];

    cashStatements = calculateCashStatementMetaData(cashStatements);

    return cashStatements;
  }
);

/**
 * Group an array of cash statements by date
 *
 * @param cashStatements
 */
const _groupCashStatementsByDate = (cashStatements: Array<ICashStatement>) => {
  let groupedCashStatements: Array<any> = [];
  let statementDates: Array<any> = [];
  let count: number = 0;

  cashStatements.forEach(statement => {
    let statementDate = statement.transactionDate;
    statementDate = moment(statementDate).format("ddd MMM DD YYYY");

    // Check if an statement on the current date has already been sorted
    if (statementDates[statementDate]) {
      groupedCashStatements[statementDates[statementDate]].push(statement);
    } else {
      // Set so we can track the array index where cash Statements of a particular date are stored
      statementDates[statementDate] = count;

      // Set so we have access to the date for a particular group of cash statements
      groupedCashStatements[count] = [
        {
          date: statementDate
        }
      ];

      groupedCashStatements[count].push(statement);

      // Increment count for when a group of cash statements are created
      count = count + 1;
    }
  });

  return groupedCashStatements;
};

/**
 * Get the cash statements for the active naira cash account grouped by date
 */
export const activeNairaCashStatementsGroupedByDate = createSelector(
  getSelectedNairaCashAccountCashStatements,
  _groupCashStatementsByDate
);
