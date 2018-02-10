import { TestBed } from "@angular/core/testing";
import { StoreModule, Store, combineReducers } from "@ngrx/store";

import * as fromActions from "../../actions";
import * as fromReducers from "../../reducers";
import * as fromSelectors from "./auth.selector";

import { IAuthState, IAppState } from "../../models";
import initialState from "../../models/initialState";

describe("Auth Selectors", () => {
  let store: Store<IAppState>;

  const authState = initialState.initialAuthState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromReducers.rootReducer
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  });

  it("should return the auth feature state", () => {
    let result;

    store.select(fromSelectors.getAuthState).subscribe(value => {
      result = value;
    });
    expect(result).toEqual(authState);
  });

  it("userIsAuthenticated should return the correct isAuthenticated state", () => {
    let result;

    store.select(fromSelectors.userIsAuthenticated).subscribe(value => {
      result = value;
    });
    expect(result).toEqual(false);

    store.dispatch(
      new fromActions.LoginUserSuccess({ data: "user logged in successful" })
    );
    expect(result).toEqual(true);
  });

  it("userIsAuthenticating should return the correct isAuthenticating state", () => {
    let result;

    store.select(fromSelectors.userIsAuthenticating).subscribe(value => {
      result = value;
    });
    expect(result).toEqual(false);

    store.dispatch(
      new fromActions.LoginUser({
        username: "demo1",
        password: "csp_1234"
      })
    );
    expect(result).toEqual(true);
  });

  it("should return the number of failed auth attempts", () => {
    let result;

    store.dispatch(new fromActions.LoginUserFailed());
    store.dispatch(new fromActions.LoginUserFailed());

    store.select(fromSelectors.numberOfFailedAuthAttempts).subscribe(value => {
      result = value;
    });

    expect(result).toEqual(2);
  });
});
