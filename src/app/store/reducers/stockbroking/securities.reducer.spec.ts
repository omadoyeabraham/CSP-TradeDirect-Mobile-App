import { securitiesReducer } from "./securities.reducer";
import { ISecurity } from "../../../stockbrokingModule/models";
import { saveSecuritiesInStore } from "../../actions/stockbroking/securities.actions";

describe("STB securityReducer", () => {
  let securities = [{ name: "7up" }] as ISecurity[];
  it("should return the new state on SAVE_SECURITIES_IN_STORE", () => {
    const action = new saveSecuritiesInStore(securities);
    const state = securitiesReducer([], action);

    expect(state).toEqual(securities);
  });
});
