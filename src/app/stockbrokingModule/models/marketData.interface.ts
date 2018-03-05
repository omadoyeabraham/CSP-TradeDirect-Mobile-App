/**
 * Interface describing the structure of the market data returned for an individual equity
 *
 * @export
 * @interface IMarketData
 */
export interface IMarketData {
  name: string;
  id: string;
  label: string;
  sector: string;
  currentValueDate: string;
  previousClose: string;
  instr_type: string;
  closingPrice: string;
  openingPrice: string;
  highPrice: string;
  noDeals: string;
  lowPrice: string;
  currentPrice: string;
  lastTradePrice: string;
  quantityTraded: string;
  valueTraded: string;
  offerPrice: string;
  bestOfferQty: string;
  bestBidQty: string;
  priceChange?: any;
  priceChangePercent?: any;
}
