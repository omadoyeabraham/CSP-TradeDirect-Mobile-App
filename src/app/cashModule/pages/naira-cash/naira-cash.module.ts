import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NairaCashPage } from "./naira-cash";

import { CashModule } from "../../cash.module";

@NgModule({
  declarations: [NairaCashPage],
  imports: [IonicPageModule.forChild(NairaCashPage), CashModule]
})
export class NairaCashPageModule {}
