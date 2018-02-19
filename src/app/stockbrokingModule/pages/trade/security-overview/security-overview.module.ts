import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { SecurityOverviewPage } from "./security-overview";
import { StockbrokingModule } from "../../../stockbroking.module";
import { SharedModule } from "../../../../sharedModule/shared.module";

@NgModule({
  declarations: [SecurityOverviewPage],
  imports: [
    IonicPageModule.forChild(SecurityOverviewPage),
    StockbrokingModule.forRoot(),
    SharedModule
  ]
})
export class SecurityOverviewPageModule {}
