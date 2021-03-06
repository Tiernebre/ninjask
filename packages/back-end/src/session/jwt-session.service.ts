import { UserService } from "../user/user.service";
import { SessionRequest, sessionRequestSchema } from "./session-request";
import { Session } from "./session";
import { SessionService } from "./session.service";
import jwt, { Secret } from "jsonwebtoken";
import { SessionPayload } from "./session-payload";
import { User } from "../user/user";
import { RefreshPayload } from "./refresh-payload";
import { Logger } from "../logger";
import { randomBytes, createHash } from "crypto";

type JsonWebTokenPayload = {
  exp: number;
};

export class JwtSessionService implements SessionService {
  private readonly accessTokenSecret: Secret;
  private readonly refreshTokenSecret: Secret;

  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
    accessTokenSecret?: Secret,
    refreshTokenSecret?: Secret
  ) {
    if (!accessTokenSecret || !refreshTokenSecret) {
      this.logger.error(
        "Double check the environment variables. One or more of the JWT secrets was not provided."
      );
      throw new Error(
        "Secrets are a required enviroment property that must be set for JWT sessions."
      );
    }
    this.accessTokenSecret = accessTokenSecret;
    this.refreshTokenSecret = refreshTokenSecret;
  }

  async createOne(request: SessionRequest): Promise<Session> {
    sessionRequestSchema.parse(request);
    const { accessKey, password } = request;
    this.logger.info(
      `Possible User with Access Key = ${accessKey} is attempting to create a logged in session.`
    );
    const associatedUser =
      await this.userService.findOneWithAccessKeyAndPassword(
        accessKey,
        password
      );

    return this.signTokensForUser(associatedUser);
  }

  verifyOne(
    accessToken: string,
    providedUserFingerprint: string
  ): SessionPayload {
    const claims = jwt.verify(
      accessToken,
      this.accessTokenSecret
    ) as SessionPayload;

    if (
      this.hashUserFingerprint(providedUserFingerprint) !==
      claims.userFingerprint
    ) {
      this.logger.error(
        `A possible malicious attempt to verify a token happened for user with id = ${claims.userId} . The fingerprint was deemed invalid.`
      );
      throw new Error("Invalid Login Information");
    }

    return claims;
  }

  async refreshOne(refreshToken: string): Promise<Session> {
    this.logger.info("A Session Refresh Attempt is being verified.");
    const refreshPayload = jwt.verify(
      refreshToken,
      this.refreshTokenSecret
    ) as RefreshPayload;
    const associatedUser = await this.userService.findOneWithId(
      refreshPayload.userId
    );
    this.logger.info(
      `Found tied to user for Session Refresh Attempt with id = ${associatedUser.id}`
    );

    if (refreshPayload.tokenVersion !== associatedUser.tokenVersion) {
      this.logger.error(
        `A possible malicious attempt to refresh a token happened for user with id = ${associatedUser.id}`
      );
      throw new Error(
        "Refreshing a session could not be completed due to invalid data."
      );
    }

    const updatedUser =
      await this.userService.incrementTokenVersionForOneWithId(
        associatedUser.id
      );

    return this.signTokensForUser(updatedUser);
  }

  private signTokensForUser(user: User): Session {
    const fingerprint = this.createUserFingerprint();

    const accessToken = jwt.sign(
      {
        userId: user.id,
        accessKey: user.accessKey,
        userFingerprint: this.hashUserFingerprint(fingerprint),
      },
      this.accessTokenSecret,
      {
        expiresIn: "10 minutes",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, tokenVersion: user.tokenVersion },
      this.refreshTokenSecret,
      {
        expiresIn: "1 day",
      }
    );

    this.logger.info(
      `User with ID = ${user.id} provided valid information. A session has been created for them.`
    );

    const { exp: accessTokenExpiration } = jwt.verify(
      accessToken,
      this.accessTokenSecret
    ) as JsonWebTokenPayload;
    return new Session(
      accessToken,
      refreshToken,
      accessTokenExpiration,
      fingerprint
    );
  }

  private createUserFingerprint(): string {
    const randomFingerprint = randomBytes(50);
    return randomFingerprint.toString("hex");
  }

  private hashUserFingerprint(fingerprint: string): string {
    return createHash("sha256").update(fingerprint).digest("hex");
  }
}
