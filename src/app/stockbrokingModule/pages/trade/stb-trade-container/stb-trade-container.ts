import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import { getStbSecurities } from "../../../../store";
import { ISecurity } from "../../../models";
import { SecuritiesActionsDispatcher } from "../../../../store/actions/stockbroking/securities.actions";

/**
 * Container component which houses all trade related redux code
 *
 * @export
 * @class StbTradeContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-trade-container",
  templateUrl: "stb-trade-container.html"
})
export class StbTradeContainerPage {
  public securities: Array<ISecurity>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<IAppState>,
    public securitiesActionsDispatcher: SecuritiesActionsDispatcher
  ) {}

  ionViewDidLoad() {
    /**
     * Subscribe to the stbSecurities slice of state
     */
    this.store
      .select(getStbSecurities)
      .subscribe(
        (securities: Array<ISecurity>) => (this.securities = securities)
      );
  }

  /**
   * Dispatch the action
   *
   * @param {any} security
   * @memberof StbTradeContainerPage
   */
  dispatchSecuritySelectedAction(security) {
    this.securitiesActionsDispatcher.setSelectedSecurityOnOverviewPage(
      security
    );
  }
}
