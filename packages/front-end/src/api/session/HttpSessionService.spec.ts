import { object } from "testdouble";
import { HttpSessionService } from ".";
import { HttpClient } from "../http";
import jwt from "jsonwebtoken";
import MockDate from "mockdate";

describe("HttpSessionService", () => {
  let httpSessionService: HttpSessionService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = object<HttpClient>();
    httpSessionService = new HttpSessionService(httpClient);
    MockDate.set(0);
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe("accessTokenIsValid", () => {
    it("returns false if a given JSON web token expiration happened earlier than the current time", () => {
      const jsonWebToken = jwt.sign({}, "secret", {
        expiresIn: "-1s",
      });
      expect(httpSessionService.accessTokenIsValid(jsonWebToken)).toEqual(
        false
      );
    });

    it("returns true if a given JSON web token expiration that will happen in the future", () => {
      const jsonWebToken = jwt.sign({}, "secret", {
        expiresIn: "30 days",
      });
      expect(httpSessionService.accessTokenIsValid(jsonWebToken)).toEqual(true);
    });
  });
});
