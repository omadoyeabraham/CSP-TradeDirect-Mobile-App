import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  IFixedIncomeInvestment,
  IFixedIncomeInvestmentStatus
} from "../../../fixedIncomeModule/models";
import * as moment from "moment";

/**
 * Feature selector for getting the user's fixed income investments
 */
export const getFixedIncomeInvestments = createFeatureSelector<
  IFixedIncomeInvestment[]
>("fixedIncomeInvestments");

/**
 * Return the fixed income investments with some metadata calculated
 */
export const fixedIncomeInvestments = createSelector(
  getFixedIncomeInvestments,
  (state: IFixedIncomeInvestment[]) => {
    const fixedIncomeInvestments = state.map(investment => {
      if (investment.cspInvestmentType === "FixedIncome") {
        // For regular fixed income investments
        let currentValue =
          parseFloat(investment.accruedNetInterest) +
          parseFloat(investment.faceValue);
        let valueAtMaturity =
          parseFloat(investment.faceValue) +
          parseFloat(investment.expectedInterest);

        let startDate = moment(investment.startDate, "YYYY-MM-DD");
        let durationTillDate = moment().diff(startDate, "days");

        investment.currentValue = currentValue;
        investment.valueAtMaturity = valueAtMaturity;
        investment.durationTillDate = durationTillDate;

        // Determine the actual number of days before an investment was terminated
        if (investment.terminationDate) {
          let dateOfTermination = moment(
            investment.terminationDate,
            "YYYY-MM-DD"
          );
          let actualInvestmentDuration = dateOfTermination.diff(
            startDate,
            "days"
          );
          investment.actualInvestmentDuration = actualInvestmentDuration;
        }
      } else if (investment.cspInvestmentType === "TreasuryBill") {
        // For Treasury bill investments
        let startDate = moment(investment.startDate, "YYYY-MM-DD");
        let durationTillDate = moment().diff(startDate, "days");

        let faceValue = parseFloat(investment.faceValue);
        let rate = parseFloat(investment.currentRate) / 100;
        let accruedInterest = faceValue * rate * durationTillDate / 365;
        let currentValue = accruedInterest + faceValue;
        let valueAtMaturity = parseFloat(investment.faceValueAmount);

        investment.durationTillDate = durationTillDate;
        investment.accruedInterest = accruedInterest;
        investment.currentValue = currentValue;
        investment.valueAtMaturity = valueAtMaturity;
        investment.terminationDate = investment.terminateDate;

        if (investment.terminationDate) {
          let dateOfTermination = moment(
            investment.terminationDate,
            "YYYY-MM-DD"
          );
          let actualInvestmentDuration = dateOfTermination.diff(
            startDate,
            "days"
          );
          investment.actualInvestmentDuration = actualInvestmentDuration;
        }
      }
      return investment;
    });

    return fixedIncomeInvestments;
  }
);

/**
 * Get the currently running fixed Income Investments
 */
export const getRunningFixedIncomeInvestments = createSelector(
  fixedIncomeInvestments,
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
  fixedIncomeInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state
      .filter(
        fixedIncomeInvestment =>
          fixedIncomeInvestment.status !==
            IFixedIncomeInvestmentStatus.RUNNING &&
          fixedIncomeInvestment.status !== IFixedIncomeInvestmentStatus.PENDING
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

/**
 * ################################################################################################################
 * FX INVESTMENTS SELECTORS
 * ################################################################################################################
 */

export const getFxInvestments = createFeatureSelector<IFixedIncomeInvestment[]>(
  "fxInvestments"
);

/**
 * Return the dollar investments with some metadata calculated
 */
export const fxInvestments = createSelector(
  getFxInvestments,
  (investments: IFixedIncomeInvestment[]) => {
    const fixedIncomeInvestments = investments.map(investment => {
      // For regular fixed income investments
      let currentValue =
        parseFloat(investment.accruedNetInterest) +
        parseFloat(investment.faceValue);
      let valueAtMaturity =
        parseFloat(investment.faceValue) +
        parseFloat(investment.expectedInterest);

      let startDate = moment(investment.startDate, "YYYY-MM-DD");
      let durationTillDate = moment().diff(startDate, "days");

      investment.currentValue = currentValue;
      investment.valueAtMaturity = valueAtMaturity;
      investment.durationTillDate = durationTillDate;

      // Determine the actual number of days before an investment was terminated
      if (investment.terminationDate) {
        let dateOfTermination = moment(
          investment.terminationDate,
          "YYYY-MM-DD"
        );
        let actualInvestmentDuration = dateOfTermination.diff(
          startDate,
          "days"
        );
        investment.actualInvestmentDuration = actualInvestmentDuration;
      }

      return investment;
    });

    console.log(fixedIncomeInvestments);
    return fixedIncomeInvestments;
  }
);

/**
 * Get the currently running fx Investments
 */
export const getRunningFxInvestments = createSelector(
  fxInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state.filter(
      fixedIncomeInvestment =>
        fixedIncomeInvestment.status === IFixedIncomeInvestmentStatus.RUNNING
    );
  }
);

/**
 * Get the terminated fx Investments
 */
export const getTerminatedFxInvestments = createSelector(
  fxInvestments,
  (state: IFixedIncomeInvestment[]) => {
    return state
      .filter(
        fixedIncomeInvestment =>
          fixedIncomeInvestment.status !==
            IFixedIncomeInvestmentStatus.RUNNING &&
          fixedIncomeInvestment.status !== IFixedIncomeInvestmentStatus.PENDING
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
 * Get the total value of all fx investments (running)
 */
export const getTotalValueOfFxInvestments = createSelector(
  getRunningFxInvestments,
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
