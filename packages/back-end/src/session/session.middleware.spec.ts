import { sessionMiddleware } from "./session.middleware";
import { object, when } from "testdouble";
import { SessionService } from "./session.service";
import { Context, Next, ParameterizedContext } from "koa";
import { FORBIDDEN, OK, UNAUTHORIZED } from "http-status";
import { generateRandomNumber, generateRandomString } from "../random";
import { SessionPayload } from "./session-payload";
import { ContextState } from "../types/state";

describe("sessionMiddleware", () => {
  let sessionService: SessionService;
  let sessionMiddlewareToTest: (
    ctx: ParameterizedContext<ContextState>,
    next: Next
  ) => Promise<void>;

  beforeEach(() => {
    sessionService = object<SessionService>();
    sessionMiddlewareToTest = sessionMiddleware(sessionService);
  });

  it("throws error if no credentials are provided", async () => {
    const mockCtx = object<ParameterizedContext<ContextState>>();
    const mockNext = jest.fn();
    mockCtx.header = {
      authorization: undefined,
    };
    await expect(
      sessionMiddlewareToTest(mockCtx, mockNext)
    ).rejects.toThrowError();
    expect(mockCtx.status).toEqual(UNAUTHORIZED);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("throws an error if the access token provided is invalid", async () => {
    const mockCtx = object<ParameterizedContext<ContextState>>();
    const mockNext = jest.fn();
    const authorization = "some-invalid-token";
    mockCtx.header = {
      authorization,
    };
    when(sessionService.verifyOne(authorization)).thenThrow(new Error());
    await expect(
      sessionMiddlewareToTest(mockCtx, mockNext)
    ).rejects.toThrowError();
    expect(mockCtx.status).toEqual(FORBIDDEN);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("resumes and goes through the middleware if the access token provided is valid", async () => {
    const mockCtx = object<ParameterizedContext<ContextState>>();
    const mockNext = jest.fn();
    const authorization = "some-invalid-token";
    mockCtx.status = OK;
    mockCtx.header = {
      authorization,
    };
    const sessionPayload: SessionPayload = {
      userId: generateRandomNumber(),
      accessKey: generateRandomString(),
    };
    when(sessionService.verifyOne(authorization)).thenReturn(sessionPayload);
    await expect(
      sessionMiddlewareToTest(mockCtx, mockNext)
    ).resolves.not.toThrowError();
    expect(mockCtx.status).toEqual(OK);
    expect(mockNext).toHaveBeenCalled();
    expect(mockCtx.state.session).toEqual(sessionPayload);
  });
});
