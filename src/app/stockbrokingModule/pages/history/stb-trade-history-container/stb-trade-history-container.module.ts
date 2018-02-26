import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StbTradeHistoryContainerPage } from "./stb-trade-history-container";
import { StockbrokingModule } from "../../../stockbroking.module";

@NgModule({
  declarations: [StbTradeHistoryContainerPage],
  imports: [
    IonicPageModule.forChild(StbTradeHistoryContainerPage),
    StockbrokingModule.forRoot()
  ]
})
export class StbTradeHistoryContainerPageModule {}
