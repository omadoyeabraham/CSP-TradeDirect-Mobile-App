import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  constructor(private http: HttpClient) {
    console.log("Hello UserProvider Provider");
  }

  public login(username: string, password: string) {}
}