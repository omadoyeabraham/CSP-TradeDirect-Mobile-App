import * as AuthActions from "./auth.actions";

describe("Auth Actions", () => {
  it("should create a LoginUser action", () => {
    const credentials = { username: "johnDoe", password: "csp_1234" };
    const action = new AuthActions.LoginUser(credentials);

    expect({ ...action }).toEqual({
      type: AuthActions.LOGIN_USER,
      payload: credentials
    });
  });

  it("should create a LoginUserFailed action", () => {
    const action = new AuthActions.LoginUserFailed();

    expect({ ...action }).toEqual({
      type: AuthActions.LOGIN_USER_FAILED
    });
  });

  it("should create a LoginUserSuccess action", () => {
    const payload = { data: "data returned from api" };
    const action = new AuthActions.LoginUserSuccess(payload);

    expect({ ...action }).toEqual({
      type: AuthActions.LOGIN_USER_SUCCESS,
      payload
    });
  });
});
