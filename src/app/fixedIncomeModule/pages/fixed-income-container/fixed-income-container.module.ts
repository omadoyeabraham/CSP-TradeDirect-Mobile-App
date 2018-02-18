import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { FixedIncomeContainerPage } from "./fixed-income-container";
import { FixedIncomeModule } from "../../fixedIncome.module";

@NgModule({
  declarations: [FixedIncomeContainerPage],
  imports: [
    IonicPageModule.forChild(FixedIncomeContainerPage),
    FixedIncomeModule
  ]
})
export class FixedIncomeContainerPageModule {}
