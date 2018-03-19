import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}
}
