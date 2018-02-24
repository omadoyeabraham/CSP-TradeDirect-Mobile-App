import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FxInvestmentsContainerPage } from "./fx-investments-container";
import { FixedIncomeModule } from "../../fixedIncome.module";

@NgModule({
  declarations: [FxInvestmentsContainerPage],
  imports: [
    IonicPageModule.forChild(FxInvestmentsContainerPage),
    FixedIncomeModule
  ]
})
export class FxInvestmentsContainerPageModule {}
