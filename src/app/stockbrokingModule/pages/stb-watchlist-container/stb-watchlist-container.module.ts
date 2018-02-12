import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StbWatchlistContainerPage } from './stb-watchlist-container';

@NgModule({
  declarations: [
    StbWatchlistContainerPage,
  ],
  imports: [
    IonicPageModule.forChild(StbWatchlistContainerPage),
  ],
})
export class StbWatchlistContainerPageModule {}
