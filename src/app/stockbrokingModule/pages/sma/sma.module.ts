import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SmaPage } from "./sma";
import { StockbrokingModule } from "../../stockbroking.module";
import { SharedModule } from "../../../sharedModule/shared.module";
import { FixedIncomeModule } from "../../../fixedIncomeModule/fixedIncome.module";

@NgModule({
  declarations: [SmaPage],
  imports: [
    IonicPageModule.forChild(SmaPage),
    StockbrokingModule.forRoot(),
    SharedModule.forRoot(),
    FixedIncomeModule
  ]
})
export class SmaPageModule {}
