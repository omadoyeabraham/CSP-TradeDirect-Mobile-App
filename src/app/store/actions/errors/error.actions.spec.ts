import * as errorActions from "./error.actions";

describe("Error Actions", () => {
  it("creates the action for authentication failure", () => {
    const payload = "Username or password incorrect";
    const action = new errorActions.AuthenticationFailed(payload);

    expect({ ...action }).toEqual({
      type: errorActions.AUTHENTICATION_FAILED,
      payload
    });
  });
});
