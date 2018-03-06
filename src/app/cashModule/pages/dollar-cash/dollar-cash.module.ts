import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DollarCashPage } from './dollar-cash';

@NgModule({
  declarations: [
    DollarCashPage,
  ],
  imports: [
    IonicPageModule.forChild(DollarCashPage),
  ],
})
export class DollarCashPageModule {}
