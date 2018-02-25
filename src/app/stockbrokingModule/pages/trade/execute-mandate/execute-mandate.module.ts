import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ExecuteMandatePage } from "./execute-mandate";
import { StockbrokingModule } from "../../../stockbroking.module";

@NgModule({
  declarations: [ExecuteMandatePage],
  imports: [
    IonicPageModule.forChild(ExecuteMandatePage),
    StockbrokingModule.forRoot()
  ]
})
export class ExecuteMandatePageModule {}
