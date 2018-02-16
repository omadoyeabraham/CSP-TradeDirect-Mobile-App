import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StbTradeContainerPage } from "./stb-trade-container";
import { StockbrokingModule } from "../../../stockbroking.module";

@NgModule({
  declarations: [StbTradeContainerPage],
  imports: [
    IonicPageModule.forChild(StbTradeContainerPage),
    StockbrokingModule.forRoot()
  ]
})
export class StbTradeContainerPageModule {}
