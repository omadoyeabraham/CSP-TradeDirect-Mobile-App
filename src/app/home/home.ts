import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as PAGES from '../pages.constants';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  /**
   * Open the login modal page
   */
  openLoginModal() {
    this.navCtrl.push(PAGES.LOGIN_PAGE);
  }

}
