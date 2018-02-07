import { TestBed, async, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {
  HttpClient,
  HttpClientModule,
  HttpRequest,
  HttpParams
} from "@angular/common/http";
import { AuthProvider } from "./auth";

import { loginURL } from "../../apiUrls.constants";

describe("AuthProvider", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthProvider]
    });
  });

  afterEach(
    inject([HttpTestingController], (backend: HttpTestingController) => {
      backend.verify();
    })
  );

  it(
    "should send an expected login request",
    async(
      inject(
        [AuthProvider, HttpTestingController],
        (userProvider: AuthProvider, backend: HttpTestingController) => {
          userProvider
            .login({ username: "demo", password: "csp_1234" })
            .subscribe();

          backend.expectOne((req: HttpRequest<any>) => {
            const body = new HttpParams({ fromString: req.body });

            return (
              req.url === loginURL &&
              req.method === "POST" &&
              body.get("username") === "demo" &&
              body.get("password") === "csp_1234"
            );
          }, 'POST to "login" with form-encoded user and password');
        }
      )
    )
  );

  it(
    'should emit "false" for 401 unauthorized',
    async(
      inject(
        [AuthProvider, HttpTestingController],
        (userProvider: AuthProvider, backend: HttpTestingController) => {
          userProvider
            .login({ username: "demo", password: "csp_1234" })
            .subscribe(response => {
              expect(response).toBeFalsy();
            });

          backend
            .expectOne(loginURL)
            .flush(null, { status: 401, statusText: "Unauthorized" });
        }
      )
    )
  );

  it(
    'should emit "true" for 200 Ok ',
    async(
      inject(
        [AuthProvider, HttpTestingController],
        (userProvider: AuthProvider, backend: HttpTestingController) => {
          userProvider
            .login({ username: "demo", password: "csp_1234" })
            .subscribe(response => {
              expect(response).toBeTruthy();
            });

          backend
            .expectOne(loginURL)
            .flush(null, { status: 200, statusText: "Ok" });
        }
      )
    )
  );
});
