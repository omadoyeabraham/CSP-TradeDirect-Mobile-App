import * as userActions from "../../actions/user/user.actions";
import * as fromStoreModels from "../../models";
import initialState from "../../models/initialState";

export function userReducer(
  state: fromStoreModels.IUserState = initialState.initialUserState,
  action: userActions.UserActionType
): fromStoreModels.IUserState {
  switch (action.type) {
    case userActions.ADD_USER_DATA_TO_STORE:
      return {
        ...action.payload
      };

    default:
      return state;
  }
}
