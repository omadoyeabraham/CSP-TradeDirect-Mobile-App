import { TestBed, async, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { UserProvider } from "./user";

describe("UserProvider", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UserProvider]
    });
  });

  it(
    "can successfully login a user",
    async(
      inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, backend: HttpTestingController) => {
          http.get("/foo/bar").subscribe();

          backend.expectOne({
            url: "/foo/bar",
            method: "GET"
          });
        }
      )
    )
  );
});
