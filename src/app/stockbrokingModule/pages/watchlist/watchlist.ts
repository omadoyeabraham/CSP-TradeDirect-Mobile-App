import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  PopoverController
} from "ionic-angular";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import {
  loadWatchList,
  getUserState,
  watchListLoading,
  userWatchList,
  getMarketData
} from "../../../store";
import { IWatchlistItem } from "../../../store/models/watchListItem.interface";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import { WatchlistProvider } from "../../providers/watchlist/watchlist";
import * as PAGES from "../../../sharedModule/pages.constants";

/**
 * Watchlist Page
 *
 * @type Container / Presentational
 * @export
 * @class WatchlistPage
 */
@IonicPage()
@Component({
  selector: "page-watchlist",
  templateUrl: "watchlist.html"
})
export class WatchlistPage {
  public userID: any;
  private watchListLoader: any;
  private deleteWatchListLoader: any;
  public watchList: IWatchlistItem[];
  public marketSecurities: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>,
    private loadingCtrl: LoadingController,
    private utilityProvider: UtilityProvider,
    private alertCtrl: AlertController,
    private watchListProvider: WatchlistProvider
  ) {}

  ionViewDidLoad() {
    this.store.select(getUserState).subscribe(userData => {
      this.userID = userData.id;
    });

    // Dispatch the action to load the user's watchlist
    this.store.dispatch(new loadWatchList(this.userID));

    this.getMarketData();

    this.store.select(watchListLoading).subscribe(loading => {
      if (loading) {
        this.presentWatchlistLoader();
      } else {
        // Only attempt to dismiss the loader if it is already visible
        if (this.watchListLoader) {
          this.watchListLoader.dismiss();
        }
      }
    });

    this.store
      .select(userWatchList)
      .subscribe((watchList: IWatchlistItem[]) => {
        watchList = watchList.map(item => {
          const item_security = this.marketSecurities.filter(security => {
            return security.name === item.name;
          });

          if (item_security.length) {
            item.current_price = item_security[0].currentPrice;
            item.price_change_percent = item_security[0].priceChangePercent;
          }

          return item;
        });

        this.watchList = watchList;
      });
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
   * Create the watchlist loader to be presented when the user is loading watchlist
   *
   * @memberof WatchListPage
   */
  presentWatchlistLoader(): void {
    this.watchListLoader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.watchListLoader.present();
  }

  /**
   * Create the loader to be presented when the user is deleting a watchlist
   *
   * @memberof WatchlistPage
   */
  presentDeleteWatchlistLoader(): void {
    this.deleteWatchListLoader = this.loadingCtrl.create({
      content: "Deleting Watchlist item..."
    });

    this.deleteWatchListLoader.present();
  }

  /**
   * Present a confirm popup for the user to confirm deleting of a watchlist item
   *
   * @param {any} watchListID
   * @param {any} userID
   * @param {any} securityName
   * @memberof WatchlistPage
   */
  confirmWatchListItemDelete(watchListID, userID, securityName) {
    let confirm = this.alertCtrl.create({
      title: "Delete Watchlist Item",
      message: `Are you sure you want to delete ${securityName} from your watchlist?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "OK",
          handler: () => {
            this.deleteWatchList(watchListID, userID);
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Delete a selected watchlist item
   *
   * @param {any} watchListID
   * @param {any} userID
   * @memberof WatchlistPage
   */
  deleteWatchList(watchListID, userID) {
    this.presentDeleteWatchlistLoader();

    this.watchListProvider.deleteWatchlistItem(watchListID, userID).subscribe(
      data => {
        console.log(data);
        if (this.deleteWatchListLoader) {
          this.store.dispatch(new loadWatchList(userID));
          this.deleteWatchListLoader.dismiss();
        }

        this.utilityProvider.presentToast(
          "Item successfully deleted",
          "toastSuccess"
        );
      },
      err => {
        if (this.deleteWatchListLoader) {
          this.deleteWatchListLoader.dismiss();
        }

        this.utilityProvider.presentToast(
          "Item failed to delete",
          "toastError"
        );
        return Observable.throw(err);
      }
    );
  }

  openAddWatchListItemPage() {
    this.navCtrl.push(PAGES.ADD_WATCHLIST_PAGE);
  }

  editWatchListItem(watchlist) {
    this.navCtrl.push(PAGES.EDIT_WATCHLIST_PAGE, { watchlist });
  }
}
