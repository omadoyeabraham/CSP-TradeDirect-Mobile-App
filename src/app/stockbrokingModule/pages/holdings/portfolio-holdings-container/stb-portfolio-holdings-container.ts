import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Container component for stockbroking portfolio holdings
 * This component handles all redux activities related to portfolio holdings
 *
 * @type Container/Smart component
 * @export
 * @class StbPortfolioHoldingsContainerPage
 */
@IonicPage()
@Component({
  selector: "page-stb-portfolio-holdings-container",
  templateUrl: "stb-portfolio-holdings-container.html"
})
export class StbPortfolioHoldingsContainerPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad StbPortfolioHoldingsContainerPage");
  }
}
