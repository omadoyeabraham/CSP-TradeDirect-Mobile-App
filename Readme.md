* Pages in ionic are lazyloaded, hence they are not defined in the various module files

<!-- prettier-ignore -->
FLOW
    + component calls actionDispatcher with data
    + Action is dispatched
    + reducers handle actions
    + side effects are called if necessary
        + side effects call http services
        + side effects dispatch actions based on response from http services
    + reducers handle actions dispatched from side effects
