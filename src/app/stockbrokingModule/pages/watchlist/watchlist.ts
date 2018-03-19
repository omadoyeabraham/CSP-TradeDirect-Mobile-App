import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import { loadWatchList, getUserState } from "../../../store";

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IAppState>
  ) {}

  ionViewDidLoad() {
    this.store.select(getUserState).subscribe(userData => {
      this.userID = userData.id;
    });
    // Dispatch the action to load the user's watchlist
    this.store.dispatch(new loadWatchList(this.userID));
  }
}
