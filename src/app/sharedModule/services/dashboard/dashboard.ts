import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { IAppState } from "../../../store/models/index";

/**
 * Service encompassing all dashboard related activities
 *
 * @export
 * @class DashboardProvider
 */
@Injectable()
export class DashboardProvider {
  constructor(public http: HttpClient, private store: Store<IAppState>) {
    console.log("Hello DashboardProvider Provider");
  }

  getData(): Observable<IAppState> {
    return this.store.select(appState => appState);
  }
}
