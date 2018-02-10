import { TestBed } from "@angular/core/testing";
import { StoreModule, Store, combineReducers } from "@ngrx/store";

import * as fromActions from "../../actions";
import * as fromReducers from "../../reducers";
import * as fromSelectors from "./user.selector";

import { IAppState } from "../../models";
import initialState from "../../models/initialState";

describe("User Selectors", () => {
  let store: Store<IAppState>;

  const userState = initialState.initialUserState;

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

  it("should return the user feature state", () => {
    let result;

    store.select(fromSelectors.getUserState).subscribe(value => {
      result = value;
    });
    expect(result).toEqual(userState);
  });
});
