export enum IFixedIncomeInvestmentStatus {
  RUNNING = "RUNNING",
  TERMINATED = "TERMINATED"
}

/**
 * Interface definition for a fixed income investment
 *
 * @export
 * @interface IFixedIncomeInvestment
 */
export interface IFixedIncomeInvestment {
  accruedInterest: string;
  accruedNetInterest: string;
  autoRollover: boolean;
  currency: string;
  currentRate: string;
  customerId: number;
  customerLabel: string;
  customerName: string;
  expectedInterest: string;
  expectedMaturity: string;
  expectedNetInterest: string;
  faceValue: string;
  id: number;
  instrumentTypeLabel: string;
  instrumentTypeName: string;
  label: string;
  name: string;
  portfolioLabel: string;
  portfolioName: string;
  rolloverAmount: string;
  rolloverRule: string;
  startDate: string;
  status: IFixedIncomeInvestmentStatus;
  tenure: number;
  valueAtTermination?: number;
}
