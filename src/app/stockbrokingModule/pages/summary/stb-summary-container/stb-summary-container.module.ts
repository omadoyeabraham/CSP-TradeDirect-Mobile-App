import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StbSummaryContainerPage } from "./stb-summary-container";
import { StockbrokingModule } from "../../../stockbroking.module";

/**
 * Page module created by Ionic to allow for lazy loaded pages.
 * This (and other STB pages) imports the stockbroking module which exports STB related components and services so they can display and use them
 *
 * @export
 * @class StbSummaryContainerPageModule
 */
@NgModule({
  declarations: [StbSummaryContainerPage],
  imports: [
    IonicPageModule.forChild(StbSummaryContainerPage),
    StockbrokingModule
  ]
})
export class StbSummaryContainerPageModule {}
