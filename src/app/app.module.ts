import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storageSync } from "ngrx-store-ionic-storage";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { MyApp } from "./app.component";
import { SharedModule } from "./sharedModule/shared.module";
import { CspStoreModule } from "./store/store.module";

import { rootReducer, metaReducers } from "./store/reducers";
import { allEffects } from "./store/effects";

@NgModule({
  declarations: [MyApp],
  imports: [
    SharedModule.forRoot(),
    CspStoreModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(rootReducer, { metaReducers }),
    EffectsModule.forRoot(allEffects),
    StoreDevtoolsModule.instrument({})
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClientModule
  ]
})
export class AppModule {}
