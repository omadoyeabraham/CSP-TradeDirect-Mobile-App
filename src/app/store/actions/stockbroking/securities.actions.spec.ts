import * as securitiesActions from "./securities.actions";
import { ISecurity } from "../../../stockbrokingModule/models";

describe("STB Securities Actions", () => {
  const testSecurity = {} as ISecurity;
  it("should create the action to get all securities", () => {
    const action = new securitiesActions.getSecurities();

    expect({
      ...action
    }).toEqual({ type: securitiesActions.GET_SECURITIES });
  });

  it("should create the action to save all securities", () => {
    const action = new securitiesActions.saveSecuritiesInStore(testSecurity);

    expect({ ...action }).toEqual({
      type: securitiesActions.SAVE_SECURITIES_IN_STORE,
      payload: testSecurity
    });
  });
});
