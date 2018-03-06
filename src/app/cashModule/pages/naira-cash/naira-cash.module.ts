import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NairaCashPage } from './naira-cash';

@NgModule({
  declarations: [
    NairaCashPage,
  ],
  imports: [
    IonicPageModule.forChild(NairaCashPage),
  ],
})
export class NairaCashPageModule {}
