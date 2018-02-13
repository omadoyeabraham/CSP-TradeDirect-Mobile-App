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

  it("should return the stbPortfolios entities", () => {
    let result;
    store
      .select(selectors.getStbPortfoliosEntities)
      .subscribe(val => (result = val));

    expect(result).toEqual(initialStbPortfoliosState);
  });

  it("should correctly return the portfolios as an array", () => {
    let result;
    store.select(selectors.getStbPortfolios).subscribe(val => (result = val));

    expect(result).toEqual([
      initialStbPortfoliosState[3791],
      initialStbPortfoliosState[3792]
    ]);
  });

  it("should count the number of stb portfolios correctly", () => {
    let result;
    store
      .select(selectors.getNumberOfStbPortfolios)
      .subscribe(val => (result = val));

    expect(result).toEqual(initialNumberOfPortfolios);
  });

  it("should return the stbActivePortfolio feature state", () => {
    let result;
    store
      .select(selectors.getActivePortfolio)
      .subscribe(portfolio => (result = portfolio));

    expect(result).toEqual(
      initialState.initialStockbrokingActivePortfolioState
    );
  });
});
