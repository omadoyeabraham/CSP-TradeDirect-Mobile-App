import userReducer from "./user.reducer";
import { IUserState } from "../../models";
import { initialUserState } from "../../models/initialState";
import * as UserActions from "../../actions/user/user.actions";

describe("User Reducer", () => {
  it("should return the default state", () => {
    const action = {} as any;
    const state = userReducer(undefined, action);

    expect(state).toBe(initialUserState);
  });

  it("should set the user data on ADD_USER_DATA_TO_STORE", () => {
    const userData: IUserState = {
      ...initialUserState,
      name: "John Doe"
    };
    const action = new UserActions.AddUserDataToStore(userData);
    const state = userReducer(initialUserState, action);

    expect(state).toBe(userData);
  });
});
