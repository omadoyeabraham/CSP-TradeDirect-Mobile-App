import * as UserActions from "./user.actions";
import { initialUserState } from "../../models/initialState";

describe("User Actions", () => {
  it("should create a addUserDataToStore action", () => {
    const payload = { ...initialUserState, name: "John Doe" };
    const action = new UserActions.AddUserDataToStore(payload);

    expect({ ...action }).toEqual({
      type: UserActions.ADD_USER_DATA_TO_STORE,
      payload
    });
  });
});
