import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StbTradeHistoryPage } from "./stb-trade-history";
import { StockbrokingModule } from "../../stockbroking.module";

@NgModule({
  declarations: [StbTradeHistoryPage],
  imports: [
    IonicPageModule.forChild(StbTradeHistoryPage),
    StockbrokingModule.forRoot()
  ]
})
export class StbTradeHistoryPageModule {}
