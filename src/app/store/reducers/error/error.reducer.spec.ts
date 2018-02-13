import { errorReducer } from "./error.reducer";
import * as errorActions from "../../actions/errors/error.actions";
import { initialErrorState } from "../../models/initialState";

describe("Error Reducer", () => {
  it("should return the default state", () => {
    const action = {} as any;
    const state = errorReducer(undefined, action);

    expect(state).toEqual(initialErrorState);
  });

  it("should set the authenticationErrorMessage on AUTHENTICATION_FAILED", () => {
    const payload = "Username or password incorrect";
    const action = new errorActions.AuthenticationFailed(payload);
    const state = errorReducer(initialErrorState, action);

    expect(state).toEqual({
      ...initialErrorState,
      authenticationErrorMessage: payload
    });
  });
});
