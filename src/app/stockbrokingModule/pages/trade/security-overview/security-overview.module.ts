import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SecurityOverviewPage } from "./security-overview";
import { StockbrokingModule } from "../../../stockbroking.module";

@NgModule({
  declarations: [SecurityOverviewPage],
  imports: [
    IonicPageModule.forChild(SecurityOverviewPage),
    StockbrokingModule.forRoot()
  ]
})
export class SecurityOverviewPageModule {}
