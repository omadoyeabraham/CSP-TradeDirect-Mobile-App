import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  IFixedIncomeInvestment,
  IFixedIncomeInvestmentStatus
} from "../../../fixedIncomeModule/models";

/**
 * Feature selector for getting the user's fixed income investments
 */
export const getFixedIncomeInvestments = createFeatureSelector<
  IFixedIncomeInvestment[]
>("fixedIncomeInvestments");

/**
 * Get the currently running fixed Income Investments
 */
export const getRunningFixedIncomeInvestments = createSelector(
  getFixedIncomeInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state.filter(
      fixedIncomeInvestment =>
        fixedIncomeInvestment.status === IFixedIncomeInvestmentStatus.RUNNING
    );
  }
);

/**
 * Get the terminated fixed Income Investments
 */
export const getTerminatedFixedIncomeInvestments = createSelector(
  getFixedIncomeInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state
      .filter(
        fixedIncomeInvestment =>
          fixedIncomeInvestment.status ===
          IFixedIncomeInvestmentStatus.TERMINATED
      )
      .map(fixedIncomeInvestment => {
        // Determine the value at termination for terminated investments
        fixedIncomeInvestment.valueAtTermination =
          parseFloat(fixedIncomeInvestment.faceValue) +
          parseFloat(fixedIncomeInvestment.accruedInterest);

        return fixedIncomeInvestment;
      });
  }
);

/**
 * Get the total number of running fixed income investments
 */
export const getNumberOfRunningFixedIncomeInvestments = createSelector(
  getRunningFixedIncomeInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state.length;
  }
);

/**
 * Get the total number of terminated fixed income investments
 */
export const getNumberOfTerminatedFixedIncomeInvestments = createSelector(
  getTerminatedFixedIncomeInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state.length;
  }
);

/**
 * Get the total value of all fixed income investments (running)
 */
export const getTotalValueOfFixedIncomeInvestments = createSelector(
  getRunningFixedIncomeInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state.reduce((total, investment) => {
      return (
        total +
        parseFloat(investment.accruedInterest) +
        parseFloat(investment.faceValue)
      );
    }, 0);
  }
);
