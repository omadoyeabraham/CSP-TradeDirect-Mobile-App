import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import "rxjs/add/observable/of";

import * as securityActions from "../../actions/stockbroking/securities.actions";
import { map, switchMap, catchError } from "rxjs/operators";
import { SecuritiesProvider } from "../../../sharedModule/services/securities/securities";

/**
 * Side effects which are triggered whenever securities related actions are dispatched
 */

@Injectable()
export class SecuritiesEffects {
  constructor(
    private actions$: Actions,
    private securitiesProvider: SecuritiesProvider
  ) {}

  /**
   * Side effect triggered when the getSecurites action is triggered
   *
   * @memberof SecuritiesEffects
   */
  @Effect()
  getSecurities$ = this.actions$.ofType(securityActions.GET_SECURITIES).pipe(
    map((action: securityActions.getSecurities) => action),
    switchMap(getSecuritiesAction => {
      return this.securitiesProvider.getSecurities().pipe(
        map(securities => {
          return securities;
        }),
        switchMap(securities => [
          new securityActions.saveSecuritiesInStore(securities)
        ])
      );
    })
  );

  @Effect()
  getSelectedSecurityData$ = this.actions$
    .ofType(securityActions.SET_SELECTED_SECURITY_ON_OVERVIEW_PAGE)
    .pipe(
      map(
        (action: securityActions.setSelectedSecurityOnOverviewPage) => action
      ),
      switchMap(setSelectedSecurityAction => {
        return this.securitiesProvider
          .getSelectedSecurityMarketData(setSelectedSecurityAction.payload.name)
          .pipe(
            switchMap(securityMarketData => [
              new securityActions.saveSelectedSecurityOnOverviewPageMarketDataToStore(
                securityMarketData
              )
            ])
          );
      })
    );
}
