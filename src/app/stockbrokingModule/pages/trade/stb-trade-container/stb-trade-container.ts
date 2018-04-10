import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Store } from "@ngrx/store";

import { IAppState } from "../../../../store/models";
import {
  SelectedPageActionsDispatcher,
  getMarketData
} from "../../../../store";
import { ISecurity, IMarketData } from "../../../models";
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
    public securitiesActionsDispatcher: SecuritiesActionsDispatcher,
    public selectedPageActionsDispatcher: SelectedPageActionsDispatcher
  ) {}

  ionViewDidLoad() {
    /**
     * Subscribe to the marketData slice of state
     */
    // this.store
    //   .select(getStbSecurities)
    //   .subscribe(
    //     (securities: Array<ISecurity>) => (this.securities = securities)
    //   );

    this.store
      .select(getMarketData)
      .subscribe((marketData: Array<IMarketData>) => {
        this.securities = marketData;
      });
  }

  /**
   * Dispatch the action
   *
   * @param {any} security
   * @memberof StbTradeContainerPage
   */
  dispatchSecuritySelectedAction(securityName) {
    const selectedSecurity = this.securities.filter(
      sec => sec.name === securityName
    )[0];

    this.securitiesActionsDispatcher.setSelectedSecurityOnOverviewPage(
      selectedSecurity
    );
  }

  /**
   * Dispatch the action which sets data about the selectedPage in the store
   *
   * @param {string} pageName
   * @memberof StbTradeContainerPage
   */
  dispatchSelectedPageChangedAction(pageName: string) {
    this.selectedPageActionsDispatcher.setSelectedPageData({
      name: pageName,
      time: Date.now()
    });
  }
}
