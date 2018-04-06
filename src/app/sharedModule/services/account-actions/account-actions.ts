import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  contactManagerURL,
  FindUserByUsernameURL,
  SendPasswordResetLinkURL
} from "../../apiUrls.constants";
import { map, catchError } from "rxjs/operators";

/**
 *
 *
 * @export
 * @class AccountActionsProvider
 */
@Injectable()
export class AccountActionsProvider {
  constructor(public http: HttpClient) {}

  contactManager(data: {
    subject: string;
    message: string;
    email: string;
    userName: string;
  }): Observable<any> {
    const body = new HttpParams()
      .set("subject", data.subject)
      .set("message", data.message)
      .set("email", data.email)
      .set("userName", data.userName);
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post(contactManagerURL, body.toString(), {
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

  /**
   * Verify that a user with the {username} exists
   *
   * @param {string} username
   * @returns {Observable<any>}
   * @memberof AccountActionsProvider
   */
  verifyUsername(username: string): Observable<any> {
    const body = new HttpParams().set("username", username);
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post(FindUserByUsernameURL, body.toString(), {
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

  /**
   * Send password reset link to users
   *
   * @param {any} username
   * @param {any} email
   * @param {any} id
   * @param {any} label
   * @returns {Observable<any>}
   * @memberof AccountActionsProvider
   */
  sendPasswordResetLink(username, email, id, label): Observable<any> {
    const body = new HttpParams()
      .set("username", username)
      .set("email", email)
      .set("user_id", id)
      .set("userLabel", label);
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post(SendPasswordResetLinkURL, body.toString(), {
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
