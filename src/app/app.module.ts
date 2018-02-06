import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { MyApp } from "./app.component";

import { UserProvider } from "./sharedModule/services/user/user";
import { DashboardProvider } from '../providers/dashboard/dashboard';

@NgModule({
  declarations: [MyApp],
  imports: [ReactiveFormsModule, BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClientModule,
    UserProvider,
    DashboardProvider
  ]
})
export class AppModule {}
