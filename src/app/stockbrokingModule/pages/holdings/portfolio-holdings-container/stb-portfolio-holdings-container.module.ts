import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StbPortfolioHoldingsContainerPage } from "./stb-portfolio-holdings-container";
import { StockbrokingModule } from "../../../stockbroking.module";

@NgModule({
  declarations: [StbPortfolioHoldingsContainerPage],
  imports: [
    IonicPageModule.forChild(StbPortfolioHoldingsContainerPage),
    StockbrokingModule.forRoot()
  ]
})
export class StbPortfolioHoldingsContainerPageModule {}
