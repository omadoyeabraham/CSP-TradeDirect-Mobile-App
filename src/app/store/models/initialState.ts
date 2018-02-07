import { IAuthState } from "./index";

/**
 * The initial state to be used by various reducers in constructing the entire application state tree
 */

const initialUserState = {};

const initialAuthState: IAuthState = {
  isAuthenticating: false,
  authenticated: false
};

export default { initialUserState, initialAuthState };
