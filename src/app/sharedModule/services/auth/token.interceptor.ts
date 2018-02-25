import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { IAppState } from "../../../store/models";
import { Store } from "@ngrx/store";
import { getAuthenticationToken } from "../../../store";

/**
 * Http interceptor class which intercepts every request sent from the application and adds the authorization token to the request.
 * This allows access to protected api endpoints.
 *
 * @export
 * @class TokenInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public authToken: string;

  constructor(private store: Store<IAppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store
      .select(getAuthenticationToken)
      .subscribe((authToken: string) => (this.authToken = authToken));
    request = request.clone({
      setHeaders: {
        Authorization: `${this.authToken}`
      }
    });
    return next.handle(request);
  }
}
