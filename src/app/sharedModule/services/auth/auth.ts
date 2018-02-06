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

  public login(username: string, password: string) {
    const body = new HttpParams()
      .set(`username`, username)
      .set(`password`, password);
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    return this.http
      .post(`auth/login`, body.toString(), { headers, observe: "response" })
      .map((res: HttpResponse<Object>) => {
        return res.ok;
      })
      .catch((err: any) => {
        return Observable.of(false);
      });
  }
}
