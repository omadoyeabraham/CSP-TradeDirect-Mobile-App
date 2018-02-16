import { Component } from '@angular/core';

/**
 * Generated class for the TradeOverviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trade-overview',
  templateUrl: 'trade-overview.html'
})
export class TradeOverviewComponent {

  text: string;

  constructor() {
    console.log('Hello TradeOverviewComponent Component');
    this.text = 'Hello World';
  }

}
