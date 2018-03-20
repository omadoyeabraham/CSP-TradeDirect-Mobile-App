import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { WatchlistProvider } from "../../providers/watchlist/watchlist";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IWatchlistItem } from "../../../store/models/watchListItem.interface";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import { getMarketData, loadWatchList } from "../../../store";
import * as PAGES from "../../../sharedModule/pages.constants";

/**
 *
 *
 * @export
 * @class EditWatchListPage
 */
@IonicPage()
@Component({
  selector: "page-edit-watch-list",
  templateUrl: "edit-watch-list.html"
})
export class EditWatchListPage {
  public editWatchListForm: FormGroup;
  public security: FormControl;
  public condition: FormControl;
  public price: FormControl;
  public notification: FormControl;
  public watchListItem: IWatchlistItem;

  public userID: any;
  private editWatchListLoader: any;
  public conditions: any;
  public marketSecurities: any;
  public securityMarketData: any;
  public updateWatchListItemLoader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public watchListProvider: WatchlistProvider,
    public utilityProvider: UtilityProvider,
    public store: Store<IAppState>
  ) {
    this.watchListItem = this.navParams.get("watchlist");

    this.security = new FormControl({
      value: this.watchListItem.name,
      disabled: true
    });
    this.condition = new FormControl(
      this.watchListItem.condition,
      Validators.required
    );
    this.price = new FormControl(
      this.watchListItem.notify_price,
      Validators.required
    );

    // Set the watchlist status to a boolean
    let status: boolean = this.watchListItem.status === "1";

    this.notification = new FormControl(status);

    // Create the formGroup
    this.editWatchListForm = new FormGroup({
      security: this.security,
      condition: this.condition,
      price: this.price,
      notification: this.notification
    });
  }

  ionViewDidLoad() {
    this.getConditions();
    this.getMarketData();

    const selectedSecurity = this.marketSecurities.filter(
      sec => sec.name === this.watchListItem.name
    )[0];

    this.securityMarketData = selectedSecurity;
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
      this.marketSecurities = marketData;
    });
  }

  /**
   * Create the watchlist loader to be presented when the user is updating an item in the watchlist
   *
   * @memberof WatchListPage
   */
  presentUpdateWatchListItemLoader(): void {
    this.updateWatchListItemLoader = this.loadingCtrl.create({
      content: "Updating item in your watchlist..."
    });

    this.updateWatchListItemLoader.present();
  }

  editWatchListItem() {
    if (!this.editWatchListForm.valid) {
      return;
    } else {
      let status: number = 1;
      let conditionLabel = "";

      if (this.notification.value === true) {
        status = 1;
      } else {
        status = 0;
      }

      if (this.condition.value === "<=") {
        conditionLabel = "LESS THAN OR EQUAL TO";
      } else {
        conditionLabel = "GREATER THAN OR EQUAL TO";
      }

      const updatedWatchListItem = {
        ...this.watchListItem,
        notify_price: this.price.value,
        condition: this.condition.value,
        condition_name: conditionLabel,
        status
      };

      this.presentUpdateWatchListItemLoader();
      this.watchListProvider
        .updateWatchlistItem(updatedWatchListItem)
        .subscribe(
          data => {
            this.utilityProvider.presentToast(
              `Watchlist updated successfully`,
              "toastSuccess"
            );

            // Refresh the watchlist data, to reflect the newly added item
            this.store.dispatch(
              new loadWatchList(parseFloat(updatedWatchListItem.user_id))
            );

            if (this.updateWatchListItemLoader) {
              this.updateWatchListItemLoader.dismiss();
            }

            this.navCtrl.push(PAGES.WATCHLIST_PAGE);
          },
          err => {
            this.utilityProvider.presentToast(
              `Currently unable to update watchlist`,
              "toastError"
            );

            if (this.updateWatchListItemLoader) {
              this.updateWatchListItemLoader.dismiss();
            }
          }
        );
    }
  }
}
