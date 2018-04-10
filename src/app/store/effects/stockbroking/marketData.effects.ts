import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import "rxjs/add/observable/of";

import { map, switchMap } from "rxjs/operators";
import * as marketDataActions from "../../actions/stockbroking/marketdata.actions";
import { MarketDataProvider } from "../../../stockbrokingModule/providers/market-data/market-data";

/**
 * Side effects which are triggered whenever market data related actions are dispatched
 */

@Injectable()
export class MarketDataEffects {
  constructor(
    private actions$: Actions,
    private marketDataProvider: MarketDataProvider
  ) {}

  /**
   * Side effect triggered when the get market data action is dispatched
   *
   * @memberof SecuritiesEffects
   */
  @Effect()
  getMarketData$ = this.actions$.ofType(marketDataActions.GET_MARKET_DATA).pipe(
    map((action: marketDataActions.GetMarketData) => action),
    switchMap(getMarketDataAction => {
      return this.marketDataProvider.getMarketData().pipe(
        map(marketData => {
          return marketData;
        }),
        switchMap(marketData => [
          new marketDataActions.SaveMarketDataToStore(marketData)
        ])
      );
    })
  );
}
