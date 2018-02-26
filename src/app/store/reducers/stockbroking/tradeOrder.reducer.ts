import { ITradeOrderTerm } from "../../../stockbrokingModule/models/tradeOrderTerm.interface";
import {
  TradeOrderActionTypes,
  SAVE_TRADE_ORDER_TERMS_IN_STORE,
  SAVE_PREVIEWED_TRADE_ORDER_IN_STORE,
  CLEAR_PREVIEWED_TRADE_ORDER_IN_STORE,
  SAVE_TRADE_ORDER_HISTORY_IN_STORE
} from "../../actions/stockbroking/tradeOrder.actions";
import { ITradeOrder } from "../../../stockbrokingModule/models";

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
  action: TradeOrderActionTypes
): Array<ITradeOrderTerm> {
  switch (action.type) {
    case SAVE_TRADE_ORDER_TERMS_IN_STORE:
      return action.payload;
    default:
      return state;
  }
}

/**
 * Reducer which handles the stbPreviewedTradeOrder
 *
 * @export
 * @param {ITradeOrder} [state={} as ITradeOrder]
 * @param {TradeOrderActionTypes} action
 */
export function previewedTradeOrderReducer(
  state: ITradeOrder = {} as ITradeOrder,
  action: TradeOrderActionTypes
) {
  switch (action.type) {
    case SAVE_PREVIEWED_TRADE_ORDER_IN_STORE:
      return action.payload;

    case CLEAR_PREVIEWED_TRADE_ORDER_IN_STORE:
      return {} as ITradeOrder;

    default:
      return state;
  }
}

/**
 * Reducer which handles the "tradeOrderHistory" slice of stata
 *
 * @export
 * @param {Array<any>} [state=[]]
 * @param {TradeOrderActionTypes} action
 * @returns {Array<any>}
 */
export function tradeOrderHistoryReducer(
  state: Array<any> = [],
  action: TradeOrderActionTypes
): Array<any> {
  switch (action.type) {
    case SAVE_TRADE_ORDER_HISTORY_IN_STORE:
      return action.payload;
    default:
      return state;
  }
}
