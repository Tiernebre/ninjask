import { Secret } from "jsonwebtoken";
import { UserService } from "../user/user.service";
import { JwtSessionService } from "./jwt-session.service";
import { object, when } from "testdouble";
import { generateRandomNumber, generateRandomString } from "../random";
import { SessionRequest } from "./session-request";
import { generateMockUser } from "../user/user.mock";
import jwt from "jsonwebtoken";
import { RefreshPayload } from "./refresh-payload";
import { User } from "../user/user";
import { Logger } from "pino";
import { v4 as uuid } from "uuid";
import { randomBytes, createHash } from "crypto";
import { ZodError } from "zod";

describe("JwtSessionService", () => {
  let jwtSessionService: JwtSessionService;
  let userService: UserService;
  let accessTokenSecret: Secret;
  let refreshTokenSecret: Secret;

  beforeEach(() => {
    userService = object<UserService>();
    accessTokenSecret = generateRandomString();
    refreshTokenSecret = generateRandomString();
    jwtSessionService = new JwtSessionService(
      userService,
      object<Logger>(),
      accessTokenSecret,
      refreshTokenSecret
    );
  });

  describe("constructor", () => {
    it.each([null, undefined, ""])(
      "throws an error if access token secret provided is %p",
      (accessTokenSecret) => {
        expect(() => {
          new JwtSessionService(
            userService,
            object<Logger>(),
            accessTokenSecret as Secret,
            generateRandomString()
          );
        }).toThrowError();
      }
    );

    it.each([null, undefined, ""])(
      "throws an error if refresh token secret provided is %p",
      (refreshTokenSecret) => {
        expect(() => {
          new JwtSessionService(
            userService,
            object<Logger>(),
            generateRandomString(),
            refreshTokenSecret as Secret
          );
        }).toThrowError();
      }
    );
  });

  describe("createOne", () => {
    it("returns a session token bag if the request is valid", async () => {
      const request: SessionRequest = {
        accessKey: generateRandomString(),
        password: generateRandomString(),
      };
      when(
        userService.findOneWithAccessKeyAndPassword(
          request.accessKey,
          request.password
        )
      ).thenResolve(generateMockUser());
      const tokenBag = await jwtSessionService.createOne(request);
      expect(tokenBag.accessToken).toBeTruthy();
      expect(jwt.verify(tokenBag.accessToken, accessTokenSecret)).toBeTruthy();
      expect(
        jwt.verify(tokenBag.refreshToken, refreshTokenSecret)
      ).toBeTruthy();
      expect(tokenBag.accessTokenExpiration).toBeTruthy();
      expect(typeof tokenBag.accessTokenExpiration).toEqual("number");
    });

    it.each(["", null, undefined])(
      "throws a ZodError if the request access key is %p",
      async (accessKey: string) => {
        await expect(
          jwtSessionService.createOne({
            accessKey,
            password: "password",
          })
        ).rejects.toThrowError(ZodError);
      }
    );

    it.each(["", null, undefined])(
      "throws a ZodError if the request password is %p",
      async (password: string) => {
        await expect(
          jwtSessionService.createOne({
            accessKey: "accessKey",
            password,
          })
        ).rejects.toThrowError(ZodError);
      }
    );
  });

  describe("verifyOne", () => {
    const getUserFingerprint = () => {
      const userFingerprint = randomBytes(50).toString("hex");
      const userFingerprintHash = createHash("sha256")
        .update(userFingerprint)
        .digest("hex");
      return {
        userFingerprint,
        userFingerprintHash,
      };
    };

    it("returns the decoded payload if the given access token is valid", () => {
      const { userFingerprint, userFingerprintHash } = getUserFingerprint();
      const payload = {
        id: generateRandomNumber(),
        accessKey: generateRandomString(),
        userFingerprint: userFingerprintHash,
      };
      const accessToken = jwt.sign(payload, accessTokenSecret);
      expect(jwtSessionService.verifyOne(accessToken, userFingerprint)).toEqual(
        expect.objectContaining({
          id: payload.id,
          accessKey: payload.accessKey,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          iat: expect.anything(),
        })
      );
    });

    it("throws an error if a given user fingerprint is invalid (claims side)", () => {
      const { userFingerprint, userFingerprintHash } = getUserFingerprint();
      const payload = {
        id: generateRandomNumber(),
        accessKey: generateRandomString(),
        userFingerprint: userFingerprintHash + "a",
      };
      const accessToken = jwt.sign(payload, accessTokenSecret);
      expect(() =>
        jwtSessionService.verifyOne(accessToken, userFingerprint)
      ).toThrowError();
    });

    it("throws an error if a given user fingerprint is invalid (provided side)", () => {
      const { userFingerprint, userFingerprintHash } = getUserFingerprint();
      const payload = {
        id: generateRandomNumber(),
        accessKey: generateRandomString(),
        userFingerprint: userFingerprintHash,
      };
      const accessToken = jwt.sign(payload, accessTokenSecret);
      expect(() =>
        jwtSessionService.verifyOne(accessToken, userFingerprint + "a")
      ).toThrowError();
    });

    it.each(["", null, undefined, "totes not a valid JWT token"])(
      "throws an error if a given access token is %p",
      (accessToken) => {
        expect(() =>
          jwtSessionService.verifyOne(accessToken as string, uuid())
        ).toThrowError();
      }
    );

    it.each(["", null, undefined, "totes not a valid JWT token"])(
      "throws an error if a given user fingerprint is %p",
      (userFingerprint) => {
        const payload = {
          id: generateRandomNumber(),
          accessKey: generateRandomString(),
          userFingerprint: uuid(),
        };
        const accessToken = jwt.sign(payload, accessTokenSecret);
        expect(() =>
          jwtSessionService.verifyOne(accessToken, userFingerprint as string)
        ).toThrowError();
      }
    );

    it("throws an error if a given access token was signed with an incorrect secret", () => {
      const accessToken = jwt.sign({}, "totes not the expected JWT secret");
      expect(() =>
        jwtSessionService.verifyOne(accessToken, uuid())
      ).toThrowError();
    });
  });

  describe("refreshOne", () => {
    it("returns a refreshed session if the request is valid", async () => {
      const refreshPayload: RefreshPayload = {
        userId: generateRandomNumber(),
        tokenVersion: generateRandomNumber(),
      };
      const user = new User(
        refreshPayload.userId,
        generateRandomString(),
        refreshPayload.tokenVersion
      );
      const incrementedUser = new User(
        user.id,
        user.accessKey,
        user.tokenVersion + 1
      );
      when(userService.findOneWithId(user.id)).thenResolve(user);
      when(userService.incrementTokenVersionForOneWithId(user.id)).thenResolve(
        incrementedUser
      );
      const refreshToken = jwt.sign(refreshPayload, refreshTokenSecret);
      const refreshedSession = await jwtSessionService.refreshOne(refreshToken);
      expect(refreshedSession.accessToken).toBeTruthy();
      expect(
        jwt.verify(refreshedSession.accessToken, accessTokenSecret)
      ).toBeTruthy();
      expect(
        jwt.verify(refreshedSession.refreshToken, refreshTokenSecret)
      ).toBeTruthy();
      const signedPayload = jwt.verify(
        refreshedSession.refreshToken,
        refreshTokenSecret
      ) as RefreshPayload;
      expect(signedPayload.tokenVersion).toEqual(incrementedUser.tokenVersion);
      expect(refreshedSession.accessTokenExpiration).toBeTruthy();
      expect(typeof refreshedSession.accessTokenExpiration).toEqual("number");
    });

    it("throws an error if the refresh payload has an invalid token version", async () => {
      const refreshPayload: RefreshPayload = {
        userId: generateRandomNumber(),
        tokenVersion: generateRandomNumber(),
      };
      const user = new User(
        refreshPayload.userId,
        generateRandomString(),
        refreshPayload.tokenVersion + 1
      );
      when(userService.findOneWithId(user.id)).thenResolve(user);
      const refreshToken = jwt.sign(refreshPayload, refreshTokenSecret);
      await expect(
        jwtSessionService.refreshOne(refreshToken)
      ).rejects.toThrowError();
    });
  });
});
