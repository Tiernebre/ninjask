import { UserService } from "../user/user.service";
import { SessionRequest } from "./session-request";
import { SessionTokenBag } from "./session-token-bag";
import { SessionService } from "./session.service";
import jwt, { Secret } from "jsonwebtoken";
import { SessionPayload } from "./session-payload";
import { User } from "../user/user";
import { RefreshPayload } from "./refresh-payload";
import { Logger } from "../logger";

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

  async createOne({
    accessKey,
    password,
  }: SessionRequest): Promise<SessionTokenBag> {
    this.logger.info(
      `Possible User with Access Key = ${accessKey} is attempting to create a logged in session.`
    );
    const associatedUser = await this.userService.findOneWithAccessKeyAndPassword(
      accessKey,
      password
    );

    return this.signTokensForUser(associatedUser);
  }

  verifyOne(accessToken: string): SessionPayload {
    return jwt.verify(accessToken, this.accessTokenSecret) as SessionPayload;
  }

  async refreshOne(refreshToken: string): Promise<SessionTokenBag> {
    this.logger.info("A Session Refresh Attempt is being verified.");
    const refreshPayload = jwt.verify(
      refreshToken,
      this.refreshTokenSecret
    ) as RefreshPayload;
    const associatedUser = await this.userService.findOneWithId(
      refreshPayload.id
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

    const updatedUser = await this.userService.incrementTokenVersionForOneWithId(
      associatedUser.id
    );

    return this.signTokensForUser(updatedUser);
  }

  private signTokensForUser(user: User): SessionTokenBag {
    const accessToken = jwt.sign(
      { id: user.id, accessKey: user.accessKey },
      this.accessTokenSecret,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, tokenVersion: user.tokenVersion },
      this.refreshTokenSecret,
      {
        expiresIn: "1d",
      }
    );

    this.logger.info(
      `User with ID = ${user.id} provided valid information. A session has been created for them.`
    );

    const { exp: accessTokenExpiration } = jwt.verify(
      accessToken,
      this.accessTokenSecret
    ) as JsonWebTokenPayload;
    return new SessionTokenBag(
      accessToken,
      refreshToken,
      accessTokenExpiration
    );
  }
}
