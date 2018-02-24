import {
  TestBed,
  ComponentFixture,
  async,
  inject,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Store, StoreModule, combineReducers } from "@ngrx/store";

import { IonicModule, NavController, NavParams } from "ionic-angular";
import * as IonicMocks from "../../../../../test-config/mocks/mocks-ionic";

import { MyApp } from "../../../app.component";
import { LoginPage } from "./login";
import { AuthActionDispatcher } from "../../../store/index";
import * as PAGES from "../../../sharedModule/pages.constants";
import * as fromActions from "../../../store/actions";
import * as fromReducers from "../../../store/reducers";
import { IAuthState, IAppState } from "../../../store/models";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";

let page: LoginPage;
let store: Store<IAppState>;
let fixture: ComponentFixture<LoginPage>;
let de: DebugElement;
let el: HTMLElement;
let navCtrl: IonicMocks.NavMock;
const mockLoginSuccessPayload = {
  data: "mock data"
};

describe("PAGE: Login Page", () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MyApp, LoginPage],
        providers: [
          { provide: NavController, useClass: IonicMocks.NavMock },
          {
            provide: NavParams,
            useClass: class {
              NavParams = jasmine.createSpy("NavParams");
            }
          },
          {
            provide: AuthActionDispatcher,
            useClass: class {
              AuthActionDispatcher = jasmine.createSpy("AuthActionDispatcher");
            }
          },
          {
            provide: UtilityProvider,
            useClass: class {
              UtilityProvider = jasmine.createSpy("UtilityProvider");
            }
          }
        ],
        imports: [
          IonicModule.forRoot(MyApp),
          StoreModule.forRoot({
            ...fromReducers.rootReducer
          })
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    page = fixture.componentInstance;
    store = TestBed.get(Store);

    navCtrl = TestBed.get(NavController);
    spyOn(navCtrl, "push").and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
    page = null;
    de = null;
    el = null;
  });

  it("is created", () => {
    expect(fixture).toBeTruthy();
    expect(page).toBeTruthy();
  });

  //TODO: Fix this test
  xit(
    "navigates to the welcome page when authenticated",
    fakeAsync(() => {
      store.dispatch(new fromActions.LoginUserSuccess(mockLoginSuccessPayload));

      console.log(navCtrl);
      console.log(page.isAuthenticated$);
      expect(navCtrl.push).toHaveBeenCalledWith(PAGES.WELCOME_PAGE);
    })
  );
});
