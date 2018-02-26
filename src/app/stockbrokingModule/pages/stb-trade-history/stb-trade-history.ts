import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Page which displays the user's trade history
 *
 * @type Container and Presentational
 * @export
 * @class StbTradeHistoryPage
 */
@IonicPage()
@Component({
  selector: "page-stb-trade-history",
  templateUrl: "stb-trade-history.html"
})
export class StbTradeHistoryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad StbTradeHistoryPage");
  }
}
