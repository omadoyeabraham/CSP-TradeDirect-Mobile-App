import authReducer from "./auth.reducers";
/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */
export const rootReducer = {
  auth: authReducer
};
