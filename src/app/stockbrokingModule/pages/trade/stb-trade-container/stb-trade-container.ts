import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad StbTradeContainerPage");
  }
}
