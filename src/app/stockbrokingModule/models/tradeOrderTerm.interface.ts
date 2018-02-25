/**
 * Interface for a trade order term
 *
 * @export
 * @interface ITradeOrderTerm
 */
export interface ITradeOrderTerm {
  defLifeTime: number;
  fixTimeInForce: string;
  id: number;
  label: string;
  name: string;
}
