import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PlaceMandatePage } from "./place-mandate";
import { StockbrokingModule } from "../../../stockbroking.module";

@NgModule({
  declarations: [PlaceMandatePage],
  imports: [IonicPageModule.forChild(PlaceMandatePage), StockbrokingModule]
})
export class PlaceMandatePageModule {}
