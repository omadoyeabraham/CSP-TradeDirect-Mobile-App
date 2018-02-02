import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * The StbContainer is the wrapper component in which all stockbroking related tabs and subpages and component are rendered
 *
 * @author Omadoye Abraham
 */

@IonicPage()
@Component({
  selector: 'page-stb-container',
  templateUrl: 'stb-container.html',
})
export class StbContainerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StbContainerPage');
  }

}
