import { TestBed } from "@angular/core/testing";
import { StoreModule, Store } from "@ngrx/store";

import * as fromReducers from "../../reducers";
import * as selectors from "./portfolios.selectors";
import { IAppState } from "../../models/";
import * as initialState from "../../models/initialState";

describe("stbPortfolios Selector", () => {
  let store: Store<IAppState>;
  const initialStbPortfoliosState =
    initialState.initialStockbrokingPortfolioState;
  const initialNumberOfPortfolios = Object.keys(initialStbPortfoliosState)
    .length;

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

  it("should return the stbPortfolios feature state", () => {
    let result;
    store
      .select(selectors.getStbPortfoliosState)
      .subscribe(val => (result = val));

    expect(result).toEqual(initialStbPortfoliosState);
  });

  it("should count the number of stb portfolios correctly", () => {
    let result;
    store
      .select(selectors.getNumberOfStbPortfolios)
      .subscribe(val => (result = val));

    expect(result).toEqual(initialNumberOfPortfolios);
  });
});
