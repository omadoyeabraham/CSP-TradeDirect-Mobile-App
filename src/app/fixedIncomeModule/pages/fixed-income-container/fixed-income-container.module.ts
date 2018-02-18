import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedIncomeContainerPage } from './fixed-income-container';

@NgModule({
  declarations: [
    FixedIncomeContainerPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedIncomeContainerPage),
  ],
})
export class FixedIncomeContainerPageModule {}
