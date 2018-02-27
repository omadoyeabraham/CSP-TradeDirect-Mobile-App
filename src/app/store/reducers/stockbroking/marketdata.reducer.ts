import { IMarketData } from "../../../stockbrokingModule/models";
import { MarketDataActionTypes, SAVE_MARKET_DATA_TO_STORE } from "../..";

export default function marketDataReducer(
  state: Array<IMarketData> = [] as Array<IMarketData>,
  action: MarketDataActionTypes
): Array<IMarketData> {
  switch (action.type) {
    case SAVE_MARKET_DATA_TO_STORE:
      return action.payload;
    default:
      return state;
  }
}
