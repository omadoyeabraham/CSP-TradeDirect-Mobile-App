import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";

import { ISecurity } from "../../../models";
import { NavController } from "ionic-angular";
import { STB_SECURITY_OVERVIEW_PAGE } from "../../../../sharedModule/pages.constants";

/**
 * Presentational component which displays all equities with their pictures
 *
 * @type Presentational
 * @export
 * @class TradeOverviewComponent
 */
@Component({
  selector: "csmobile-trade-overview",
  templateUrl: "trade-overview.html"
})
export class TradeOverviewComponent implements OnInit {
  @Input("securities") securities: ISecurity[];
  @Input("filteredSecurities") filteredSecurities: ISecurity[];
  @Output() pageChanged = new EventEmitter();
  @Output() securitySelected = new EventEmitter();
  public searchTerm: string;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

  /**
   * Function called once a user inputs a search term
   *
   * @param {any} $event
   * @memberof TradeOverviewComponent
   */
  onSearchInput() {
    this.filterSecurities(this.searchTerm);
  }

  /**
   * filter the securities displayed on the page based on the searchterm entered by the user
   *
   * @param {string} [searchTerm=""]
   * @memberof TradeOverviewComponent
   */
  filterSecurities(searchTerm = "") {
    this.filteredSecurities = this.securities.filter(security => {
      return security.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  /**
   * Navigate to the security overview page after emitting the selected security, and broadcasting the page we are navigating to, so the container can act appropriately with the data
   *
   * @param {any} securityId
   * @memberof TradeOverviewComponent
   */
  goToSecurityOverview(securityId) {
    this.securitySelected.emit(securityId);
    this.pageChanged.emit(STB_SECURITY_OVERVIEW_PAGE);
    this.navCtrl.push(STB_SECURITY_OVERVIEW_PAGE);
  }
}
