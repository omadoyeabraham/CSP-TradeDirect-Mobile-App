import userReducer from "./user.reducers";
/**
 * Combine all reducers into a root reducer which defines the application store
 *
 */
export const rootReducer = {
  user: userReducer
};
