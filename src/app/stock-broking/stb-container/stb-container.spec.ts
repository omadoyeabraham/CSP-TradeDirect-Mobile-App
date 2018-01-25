import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StbContainerPage } from './stb-container';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StbContainerPage],
      imports: [
        IonicModule.forRoot(StbContainerPage)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StbContainerPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof StbContainerPage).toBe(true);
  });

});
