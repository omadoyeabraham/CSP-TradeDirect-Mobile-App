import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { MyApp } from "./app.component";

import { AuthProvider } from "./sharedModule/services/auth/auth";
import { DashboardProvider } from "./sharedModule/services/dashboard/dashboard";
import { rootReducer } from "./store/reducers/root.reducer";

@NgModule({
  declarations: [MyApp],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(rootReducer)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClientModule,
    AuthProvider,
    DashboardProvider
  ]
})
export class AppModule {}
