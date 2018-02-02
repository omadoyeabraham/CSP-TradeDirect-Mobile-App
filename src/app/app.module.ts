import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";

import { MyApp } from "./app.component";
import { LoginPage } from "./appModule/pages/login/login";
import { HomePage } from "./appModule/pages/home/home";
import { DashboardPage } from "./appModule/pages/dashboard/dashboard";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

@NgModule({
  declarations: [MyApp, HomePage, LoginPage, DashboardPage],
  imports: [ReactiveFormsModule, BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
