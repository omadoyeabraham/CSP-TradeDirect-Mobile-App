import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StbSummaryContainerPage } from "./stb-summary-container";
import { StockbrokingModule } from "../../../stockbroking.module";

@NgModule({
  declarations: [StbSummaryContainerPage],
  imports: [
    IonicPageModule.forChild(StbSummaryContainerPage),
    StockbrokingModule
  ]
})
export class StbSummaryContainerPageModule {}
