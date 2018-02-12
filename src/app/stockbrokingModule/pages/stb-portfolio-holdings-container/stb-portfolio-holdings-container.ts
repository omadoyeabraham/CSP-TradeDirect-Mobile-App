import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StbPortfolioHoldingsContainerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stb-portfolio-holdings-container',
  templateUrl: 'stb-portfolio-holdings-container.html',
})
export class StbPortfolioHoldingsContainerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StbPortfolioHoldingsContainerPage');
  }

}
