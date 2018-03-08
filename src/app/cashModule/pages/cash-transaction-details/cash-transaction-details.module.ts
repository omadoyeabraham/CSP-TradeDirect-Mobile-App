import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CashTransactionDetailsPage } from "./cash-transaction-details";
import { CashModule } from "../../cash.module";

@NgModule({
  declarations: [CashTransactionDetailsPage],
  imports: [IonicPageModule.forChild(CashTransactionDetailsPage), CashModule]
})
export class CashTransactionDetailsPageModule {}
