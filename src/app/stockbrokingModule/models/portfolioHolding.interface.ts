/**
 * Interface contract for a portfolio holding
 *
 * @author Omadoye Abraham
 */
export interface IPortfolioHolding {
  costBasis: string;
  gain: string;
  marketPrice: string;
  marketValue: string;
  percentGain: string;
  quantityHeld: string;
  securityExchange: string;
  securityId: number;
  securityLabel: string;
  securityName: string;
  securitySector: string;
  securityType: string;
  valuation: string;
  valueDate: string;
  maturityDate?: any;

  /**
   * Optional paramaters calculated by the app and used to plot charts
   */
  gainOrLoss?: number;
  percentageOfPortfolio?: number;
  percentageGainOrLoss?: number;
  totalCost?: number;
  lost?: boolean;
  gained?: boolean;

  /**
   * Optional parameters calculated by the app (only for bond holdings)
   */
  id?: number;
  dirtyPrice?: string;
  faceValue?: number;
  accruedCoupon?: number;
  nextCouponDate?: any;
  lastCouponDate?: any;
}
