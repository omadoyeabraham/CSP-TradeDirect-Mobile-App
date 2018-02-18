import { Component } from '@angular/core';

/**
 * Generated class for the FixedIncomeInvestmentsDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fixed-income-investments-display',
  templateUrl: 'fixed-income-investments-display.html'
})
export class FixedIncomeInvestmentsDisplayComponent {

  text: string;

  constructor() {
    console.log('Hello FixedIncomeInvestmentsDisplayComponent Component');
    this.text = 'Hello World';
  }

}
