/**
 * Interface which defines the shape of the auth 'slice' of the redux store.
 *
 * @export
 * @interface IAuthState
 */
export interface IAuthState {
  isAuthenticating: boolean;
  authenticated: boolean;
}
