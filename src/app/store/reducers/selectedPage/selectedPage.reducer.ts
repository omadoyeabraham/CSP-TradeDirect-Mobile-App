import * as selectedPageActions from "../../actions/selectedPage/selectedPage.actions";

/**
 * Reducer which stores the "selectedPage slice of state"
 * @param state
 * @param action
 */
export default function selectedPageReducer(
  state: object = {},
  action: selectedPageActions.SelectedPageActionTypes
) {
  switch (action.type) {
    case selectedPageActions.SET_SELECTED_PAGE:
      return action.payload;
    default:
      return state;
  }
}
