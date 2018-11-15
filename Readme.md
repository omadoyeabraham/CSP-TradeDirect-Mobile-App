
<!-- FLOW
    + component calls actionDispatcher with data
    + Action is dispatched
    + reducers handle actions
    + side effects are called if necessary
        + side effects call http services
        + side effects dispatch actions based on response from http services
    + reducers handle actions dispatched from side effects -->

    # CSP TradeDirect Mobile App

    This is a hybrid mobile application developed for a top investment bank in Nigeria to enable investors trade stocks on the Nigerian Stock Exchange and manage their investment portfolios. Investors are able to carry out the following actions using the investment application:

- Trade Stocks on the Nigerian Stock Exchange
- View stock and bond portfolio holdings
- View realtime market data so they make informed investment decisions
- Create a watchlist which lets them monitor and receive alerts when specific market conditions are met. E.g "send me an alert when stock X falls below 10 Naira per share"
- View various fixed income and money market investments in their portfolio


## Technology Stack Used
------------------------

This application was developed using the awesome [Ionic](https://ionicframework.com/) cross-platform hybrid mobile apps framework, and the following accompaning libraries/frameworks.

- [Angular 4](https://angular.io/) as the javascript frontend framework.
- [@ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) RxJS powered state management
- [@ngrx/effects](https://github.com/ngrx/platform/blob/master/docs/effects/README.md) Side effect model for @ngrx/store
- [Karma](https://karma-runner.github.io/latest/index.html) as the test runner.
- [Jasmine](https://jasmine.github.io/) for unit tests.
- [Istanbul](https://istanbul.js.org/) for test coverage.


## Screenshots

<div>
    <img src="https://user-images.githubusercontent.com/17690742/48553304-857f6280-e8db-11e8-8531-3d78b2b5221a.png" height="400" width="225"/>
    <img src="https://user-images.githubusercontent.com/17690742/48553371-aba50280-e8db-11e8-94c8-041cd8af55aa.png" height="400" width="225"/>
    <img src="https://user-images.githubusercontent.com/17690742/48553387-bb244b80-e8db-11e8-84c2-61d81ad734e4.png" height="400" width="225"/>
 </div>

 <br>

 <div>
    <img src="https://user-images.githubusercontent.com/17690742/48553458-ea3abd00-e8db-11e8-9114-041959c254dd.png" height="400" width="225"/>
    <img src="https://user-images.githubusercontent.com/17690742/48553499-076f8b80-e8dc-11e8-8eeb-0e316f5833b7.png" height="400" width="225"/>
    <img src="https://user-images.githubusercontent.com/17690742/48553558-3554d000-e8dc-11e8-98b7-7c36c9645731.png" height="400" width="225"/>
 </div>
