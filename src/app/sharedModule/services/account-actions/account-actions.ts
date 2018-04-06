import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { contactManagerURL } from "../../apiUrls.constants";
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
}
