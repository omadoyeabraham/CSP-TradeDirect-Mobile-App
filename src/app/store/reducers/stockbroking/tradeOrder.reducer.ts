import { ITradeOrderTerm } from "../../../stockbrokingModule/models/tradeOrderTerm.interface";
import {
  TradeOrderActions,
  SAVE_TRADE_ORDER_TERMS_IN_STORE
} from "../../actions/stockbroking/tradeOrder.actions";

/**
 * Reducer which handles the "stbTradeOrderTerms" slice of state
 *
 * @export
 * @param {Array<ITradeOrderTerm>} [state=[]]
 * @param {TradeOrderActions} action
 * @returns {Array<ITradeOrderTerm>}
 */
export default function tradeOrderTermReducer(
  state: Array<ITradeOrderTerm> = [],
  action: TradeOrderActions
): Array<ITradeOrderTerm> {
  switch (action.type) {
    case SAVE_TRADE_ORDER_TERMS_IN_STORE:
      return action.payload;
    default:
      return state;
  }
}
