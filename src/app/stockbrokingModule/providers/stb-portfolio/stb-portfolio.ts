import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the StbPortfolioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//TODO: Delete if not used, was intended for calculating values now moved to store
@Injectable()
export class StbPortfolioProvider {
  constructor(public http: HttpClient) {
    console.log("Hello StbPortfolioProvider Provider");
  }
}
