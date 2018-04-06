import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import "rxjs/add/observable/throw";

import { loginURL, resetPasswordURL } from "../../apiUrls.constants";

/**
 * Injectable angular service which handles authentication related functionality
 *
 * @export
 * @class AuthProvider
 */
@Injectable()
export class AuthProvider {
  constructor(private http: HttpClient) {}

  /**
   * Make an api call to log the user into the application
   *
   * @param credentials: {username: string, password: string}
   * @returns {Observable<any>}
   * @memberof AuthProvider
   */
  public login(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    const body = new HttpParams()
      .set(`username`, credentials.username)
      .set(`password`, credentials.password);
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post(loginURL, body.toString(), { headers, observe: "response" })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response.body;
        }),
        catchError((error: any) => Observable.throw(error))
      );
  }

  /**
   * Change the user's password
   *
   * @param {{
   *     customerId: string;
   *     oldPassword: string;
   *     newPassword: string;
   *   }} data
   * @returns {Observable<any>}
   * @memberof AuthProvider
   */
  public changePassword(data: {
    customerId: string;
    oldPassword: string;
    newPassword: string;
  }): Observable<any> {
    const body = new HttpParams()
      .set("customerId", data.customerId)
      .set("oldPassword", data.oldPassword)
      .set("newPassword", data.newPassword);
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post(resetPasswordURL, body.toString(), {
        headers,
        observe: "response"
      })
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response.body;
        }),
        catchError((error: any) => Observable.throw(error))
      );
  }
}
