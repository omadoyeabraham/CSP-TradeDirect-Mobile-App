import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { WatchlistPage } from "./watchlist";
import { SharedModule } from "../../../sharedModule/shared.module";
import { StockbrokingModule } from "../../stockbroking.module";

@NgModule({
  declarations: [WatchlistPage],
  imports: [
    IonicPageModule.forChild(WatchlistPage),
    SharedModule.forRoot(),
    StockbrokingModule.forRoot()
  ]
})
export class WatchlistPageModule {}
