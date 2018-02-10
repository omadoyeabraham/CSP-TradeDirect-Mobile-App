import { TestBed } from "@angular/core/testing";
import { StoreModule, Store, combineReducers } from "@ngrx/store";

import * as fromActions from "../../actions";
import * as fromReducers from "../../reducers";
import * as fromSelectors from "./errors.selector";

import { IAppState } from "../../models";
import initialState from "../../models/initialState";

describe("User Selectors", () => {
  let store: Store<IAppState>;

  const errorState = initialState.initialErrorState;

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

  it("should return the error feature state", () => {
    let result;

    store.select(fromSelectors.getErrorState).subscribe(value => {
      result = value;
    });
    expect(result).toEqual(errorState);
  });

  it("should return the correct authentication error message", () => {
    let result;
    const errorMessage = "Your account is locked";

    store.dispatch(new fromActions.AuthenticationFailed(errorMessage));
    store
      .select(fromSelectors.getAuthenticationErrorMessage)
      .subscribe(value => (result = value));

    expect(result).toBe(errorMessage);
  });
});
