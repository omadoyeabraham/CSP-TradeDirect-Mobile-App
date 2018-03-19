import * as moment from "moment";

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFixedIncomeInvestment } from "../../../fixedIncomeModule/models";
import { IPortfolioHolding } from "../../../stockbrokingModule/models";

export const smaHoldings = createFeatureSelector<IPortfolioHolding[]>(
  "smaHoldings"
);
const _smaFixedIncomeInvestments = createFeatureSelector("smaFI");

/**
 * Get the running sma fixed income investments, and calc some extra needed data
 */
export const smaFixedIncomeInvestments = createSelector(
  _smaFixedIncomeInvestments,
  (investments: IFixedIncomeInvestment[]) => {
    // Loop through running fixed income investments and perform the necessary calculations
    investments = investments.map(investment => {
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

      return investment;
    });

    return investments;
  }
);

/**
 * Get the running sma fixed income investments
 */
export const runningSmaFI = createSelector(
  smaFixedIncomeInvestments,
  (investments: IFixedIncomeInvestment[]) => {
    investments = investments.filter(investment => {
      return investment.status === "RUNNING";
    });

    return investments;
  }
);

/**
 * Get the total value of the sma fixed income investments
 */
export const smaFiTotalValue = createSelector(
  runningSmaFI,
  (investments: IFixedIncomeInvestment[]) => {
    const totalValue = investments.reduce((acc, investment) => {
      return (
        acc +
        parseFloat(investment.accruedNetInterest) +
        parseFloat(investment.faceValue)
      );
    }, 0);

    return totalValue;
  }
);
