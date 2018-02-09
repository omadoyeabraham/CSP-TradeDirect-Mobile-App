import authReducer from "./auth.reducers";
import { IAuthState } from "../../models/index";
import initialState from "../../models/initialState";
import * as AuthActions from "../../actions/auth/auth.actions";

describe("auth reducer", () => {
  let authState: IAuthState;
  let initialAuthState;

  beforeEach(() => {
    initialAuthState = initialState.initialAuthState;
  });

  it("should return the default state", () => {
    const action = {} as any;
    const state = authReducer(undefined, action);

    expect(state).toBe(initialAuthState);
  });

  it("should set isAuthenticating to true on LOGIN_USER", () => {
    const credentials = { username: "johnDoe", password: "csp_1234" };
    const action = new AuthActions.LoginUser(credentials);
    const state = authReducer(initialAuthState, action);

    expect(state.isAuthenticating).toBe(true);
  });

  it("should set isAuthenticating to false and authenticated to false on LOGIN_USER_FAILED", () => {
    const action = new AuthActions.LoginUserFailed();
    const state = authReducer(initialAuthState, action);

    expect(state.isAuthenticating).toBe(false);
    expect(state.authenticated).toBe(false);
  });

  it("should set isAuthenticating to false, and authenticated to true on LOGIN_USER_SUCCESS", () => {
    const payload = { data: "data returned from api" };
    const action = new AuthActions.LoginUserSuccess(payload);
    const state = authReducer(initialAuthState, action);

    expect(state.isAuthenticating).toBe(false);
    expect(state.authenticated).toBe(true);
  });
});
