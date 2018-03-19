import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AddWatchListPage } from "./add-watch-list";
import { SharedModule } from "../../../sharedModule/shared.module";
import { StockbrokingModule } from "../../stockbroking.module";

@NgModule({
  declarations: [AddWatchListPage],
  imports: [
    IonicPageModule.forChild(AddWatchListPage),
    SharedModule.forRoot(),
    StockbrokingModule.forRoot()
  ]
})
export class AddWatchListPageModule {}
