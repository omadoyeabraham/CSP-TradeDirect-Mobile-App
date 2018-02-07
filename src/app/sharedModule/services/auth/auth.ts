import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";

import { loginURL } from "../../apiUrls.constants";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor(private http: HttpClient) {
    console.log("Hello AuthProvider Provider");
  }

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
      .map((res: HttpResponse<Object>) => res)
      .catch((err: any) => {
        return Observable.of(false);
      });
  }
}
