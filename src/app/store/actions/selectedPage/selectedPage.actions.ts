import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import { IAppState } from "../../models";

export const SET_SELECTED_PAGE =
  "[SELECTED PAGE] Store details about the selected Page in the store";

export class setSelectedPageInStore implements Action {
  readonly type = SET_SELECTED_PAGE;
  constructor(public payload: any) {}
}

export type SelectedPageActionTypes = setSelectedPageInStore;

@Injectable()
export class SelectedPageActionsDispatcher {
  constructor(public store: Store<IAppState>) {}

  setSelectedPageData(payload: any) {
    this.store.dispatch(new setSelectedPageInStore(payload));
  }
}
