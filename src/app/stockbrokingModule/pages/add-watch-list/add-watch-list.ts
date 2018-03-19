import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import {
  getStbSecurityNames,
  getUserState,
  loadWatchList,
  getMarketData
} from "../../../store";
import { ISecurity } from "../../models";
import { WatchlistProvider } from "../../providers/watchlist/watchlist";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import * as PAGES from "../../../sharedModule/pages.constants";

/**
 * Page used to add an item to the user's item list
 *
 * @type Container / Presentational
 * @export
 * @class AddWatchListPage
 */
@IonicPage()
@Component({
  selector: "page-add-watch-list",
  templateUrl: "add-watch-list.html"
})
export class AddWatchListPage {
  public addWatchListForm: FormGroup;
  public security: FormControl;
  public condition: FormControl;
  public price: FormControl;
  public notification: FormControl;

  public securities: Array<string>;
  public marketSecurities: any;
  public conditions: any;
  public securityMarketData: any;

  public addWatchListItemLoader: any;
  public submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    public loadingCtrl: LoadingController,
    public watchListProvider: WatchlistProvider,
    public utilityProvider: UtilityProvider
  ) {
    this.security = new FormControl("", Validators.required);
    this.condition = new FormControl("", Validators.required);
    this.price = new FormControl("", Validators.required);
    this.notification = new FormControl("");

    // Create the formGroup
    this.addWatchListForm = new FormGroup({
      security: this.security,
      condition: this.condition,
      price: this.price,
      notification: this.notification
    });
  }

  ionViewDidLoad() {
    this.getSecurities();
    this.getConditions();
    this.getMarketData();
    this.watchSecurityValueChanges();
  }

  /**
   * Get an array of all security names from the store
   *
   * @memberof AddWatchListPage
   */
  getSecurities() {
    this.store.select(getStbSecurityNames).subscribe(securityNames => {
      this.securities = securityNames;
    });
  }

  /**
   * Get an array of the conditions used in creating a watchlist
   *
   * @memberof AddWatchListPage
   */
  getConditions() {
    this.conditions = [
      { text: "LESS THAN OR EQUAL TO", value: "<=" },
      { text: "GREATER THAN OR EQUAL TO", value: ">=" }
    ];
  }

  /**
   * Get the market data
   *
   * @memberof AddWatchListPage
   */
  getMarketData() {
    // Select the securities with market data from the store
    this.store.select(getMarketData).subscribe(marketData => {
      console.log(marketData);
      this.marketSecurities = marketData;
    });
  }

  /**
   * Watch the security input, and update the market data based on changes
   *
   * @memberof AddWatchListPage
   */
  watchSecurityValueChanges() {
    this.security.valueChanges.subscribe(securityName => {
      // Set the selected security in the store
      const selectedSecurity = this.marketSecurities.filter(
        sec => sec.name === securityName
      )[0];

      this.securityMarketData = selectedSecurity;
    });
  }

  /**
   * Create the watchlist loader to be presented when the user is adding an item to the watchlist
   *
   * @memberof WatchListPage
   */
  presentAddWatchListItemLoader(): void {
    this.addWatchListItemLoader = this.loadingCtrl.create({
      content: "Adding item to your watchlist..."
    });

    this.addWatchListItemLoader.present();
  }

  addItemToWatchList() {
    this.submitAttempt = true;

    // Form Validation failed
    if (!this.addWatchListForm.valid) {
      return;
    } else {
      // Form is valid, so attempt to add the new watchlist item
      let userID: number;
      this.store.select(getUserState).subscribe(userData => {
        userID = userData.id;
      });

      const newWatchListItem = {
        customerId: userID,
        securityName: this.security.value,
        price: this.price.value,
        condition: this.condition.value
      };

      this.presentAddWatchListItemLoader();
      this.watchListProvider.createWatchlistItem(newWatchListItem).subscribe(
        data => {
          this.utilityProvider.presentToast(
            `${this.security.value} was successfully added to your watchlist`,
            "toastSuccess"
          );

          // Refresh the watchlist data, to reflect the newly added item
          this.store.dispatch(new loadWatchList(userID));

          if (this.addWatchListItemLoader) {
            this.addWatchListItemLoader.dismiss();
          }

          this.navCtrl.push(PAGES.WATCHLIST_PAGE);
        },
        err => {
          this.utilityProvider.presentToast(
            `Currently unable to add new watchlist item`,
            "toastError"
          );

          if (this.addWatchListItemLoader) {
            this.addWatchListItemLoader.dismiss();
          }
        }
      );
    }
  }
}
