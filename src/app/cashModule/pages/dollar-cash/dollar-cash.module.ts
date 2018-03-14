import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DollarCashPage } from "./dollar-cash";
import { CashModule } from "../../cash.module";

@NgModule({
  declarations: [DollarCashPage],
  imports: [IonicPageModule.forChild(DollarCashPage), CashModule]
})
export class DollarCashPageModule {}
