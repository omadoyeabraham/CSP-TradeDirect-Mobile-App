import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedIncomePage } from './fixed-income';

@NgModule({
  declarations: [
    FixedIncomePage,
  ],
  imports: [
    IonicPageModule.forChild(FixedIncomePage),
  ],
})
export class FixedIncomePageModule {}
