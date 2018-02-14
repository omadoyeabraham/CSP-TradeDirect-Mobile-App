import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StbContainerPage } from "./stb-container";
import { StockbrokingModule } from "../../stockbroking.module";

@NgModule({
  declarations: [StbContainerPage],
  imports: [IonicPageModule.forChild(StbContainerPage), StockbrokingModule]
})
export class StbContainerPageModule {}
