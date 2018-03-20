import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EditWatchListPage } from "./edit-watch-list";
import { SharedModule } from "../../../sharedModule/shared.module";
import { StockbrokingModule } from "../../stockbroking.module";

@NgModule({
  declarations: [EditWatchListPage],
  imports: [
    IonicPageModule.forChild(EditWatchListPage),
    SharedModule.forRoot(),
    StockbrokingModule.forRoot()
  ]
})
export class EditWatchListPageModule {}
