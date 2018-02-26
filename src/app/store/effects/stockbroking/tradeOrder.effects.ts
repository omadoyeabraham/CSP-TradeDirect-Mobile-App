import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import "rxjs/add/observable/of";

import * as tradeOrderActions from "../../actions/stockbroking/tradeOrder.actions";
import { map, switchMap, catchError } from "rxjs/operators";
import { SecuritiesProvider } from "../../../sharedModule/services/securities/securities";
import { TradeOrderProvider } from "../../../stockbrokingModule/providers/trade-order/trade-order";
import { IAppState } from "../../models";
import { Store } from "@ngrx/store";
import { getUserState } from "../..";

/**
 * Side effects which are triggered whenever securities related actions are dispatched
 */

@Injectable()
export class TradeOrderEffects {
  constructor(
    private actions$: Actions,
    private tradeOrderProvider: TradeOrderProvider,
    private store: Store<IAppState>
  ) {}

  /**
   * Side effect which listens for the "getTradeOrderHistory" action and stores the
   * trade order history in the store
   *
   * @memberof SecuritiesEffects
   */
  @Effect()
  getTradeOrderHistory$ = this.actions$
    .ofType(tradeOrderActions.GET_TRADE_ORDER_HISTORY)
    .pipe(
      map((action: tradeOrderActions.GetTradeOrderHistory) => action),
      switchMap(getTradeOrderHistoryAction => {
        let userID: number;
        // Get the userID from the store
        this.store.select(getUserState).subscribe(userData => {
          userID = userData.id;
        });

        return this.tradeOrderProvider
          .getTradeOrderHistory(userID)
          .pipe(
            map(response => response.item),
            switchMap(tradeOrders => [
              new tradeOrderActions.SaveTradeOrderHistoryInStore(tradeOrders)
            ])
          );
      })
    );
}
