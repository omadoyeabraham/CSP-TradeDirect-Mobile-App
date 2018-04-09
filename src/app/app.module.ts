import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { MyApp } from "./app.component";
import { SharedModule } from "./sharedModule/shared.module";
import { CspStoreModule } from "./store/store.module";

/**
 * The STB, FI and CASH modules were originally designed to be lazy loaded feature modules,
 * but I am unhappy with the 1 second "ish" lag that users experience when opening pages in these
 * modules for the first time. Hence the decision to eager load them here, and see if the increase
 * in intial load time (caused by increased size of resources loaded eagerly) is an acceptable trade-off
 * as long as the users subsequent experience is much smoother.
 *
 * RE: The app experience is much smoother, and the initial app load, did not really increase that much,
 * so I'm leaving these modules as eager loaded feature modules. :)
 */
import { StockbrokingModule } from "./stockbrokingModule/stockbroking.module";
import { FixedIncomeModule } from "./fixedIncomeModule/fixedIncome.module";
import { CashModule } from "./cashModule/cash.module";

import { rootReducer, metaReducers } from "./store/reducers";
import { allEffects } from "./store/effects";
import { TokenInterceptor } from "./sharedModule/services/auth/token.interceptor";

@NgModule({
  declarations: [MyApp],
  imports: [
    SharedModule.forRoot(),
    CspStoreModule.forRoot(),
    StockbrokingModule.forRoot(),
    FixedIncomeModule,
    CashModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    HttpClientModule
  ]
})
export class AppModule {}
