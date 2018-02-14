import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Container component for stockbroking summary
 * This component handles all redux related activities pertaining to stockbroking summary
 *
 * @type Container/Smart component
 * @export
 * @class StbSummaryContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-summary-container",
  templateUrl: "stb-summary-container.html"
})
export class StbSummaryContainerPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad StbSummaryContainerPage");
  }
}
