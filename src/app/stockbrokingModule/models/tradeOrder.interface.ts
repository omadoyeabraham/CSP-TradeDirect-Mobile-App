/**
 * Interface which defines the shape of a trade order
 *
 * @export
 * @interface ITradeOrder
 */
export interface ITradeOrder {
  orderType: string;
  priceType: string;
  instrument: string;
  orderTermName: string;
  quantityRequested: number;
  limitPrice?: number;
  orderOrigin: string;
  orderCurrency: string;
  portfolioLabel: string;
  portfolioName: string;
  tradeOrderTotal?: number;
  tradeOrderTotalDescription?: string;
  formattedTradeOrderTotal?: string;
  consideration?: any;
  totalFees?: any;
}
