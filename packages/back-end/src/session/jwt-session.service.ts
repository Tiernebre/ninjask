import { UserService } from "../user/user.service";
import { SessionRequest } from "./session-request";
import { SessionTokenBag } from "./session-token-bag";
import { SessionService } from "./session.service";
import jwt, { Secret } from "jsonwebtoken";
import { SessionPayload } from "./session-payload";
import { User } from "../user/user";
import { RefreshPayload } from "./refresh-payload";

export class JwtSessionService implements SessionService {
  private readonly accessTokenSecret: Secret;
  private readonly refreshTokenSecret: Secret;

  constructor(
    private readonly userService: UserService,
    accessTokenSecret?: Secret,
    refreshTokenSecret?: Secret
  ) {
    if (!accessTokenSecret || !refreshTokenSecret) {
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
    const associatedUser = await this.userService.findOneWithAccessKeyAndPassword(
      accessKey,
      password
    );

    return this.signTokensForUser(associatedUser)
  }

  verifyOne(accessToken: string): SessionPayload {
    return jwt.verify(accessToken, this.accessTokenSecret) as SessionPayload;
  }

  async refreshOne(refreshToken: string): Promise<SessionTokenBag> {
    const refreshPayload = jwt.verify(refreshToken, this.refreshTokenSecret) as RefreshPayload
    const associatedUser = await this.userService.findOneWithId(refreshPayload.id)

    if (refreshPayload.tokenVersion !== associatedUser.tokenVersion) {
      throw new Error(
        "Refreshing a session could not be completed due to invalid data."
      )
    }

    await this.userService.incrementTokenVersionForOneWithId(associatedUser.id)
    associatedUser.tokenVersion++

    return this.signTokensForUser(associatedUser)
  }

  private signTokensForUser(user: User): SessionTokenBag {
    const accessToken = jwt.sign(
      { id: user.id, accessKey: user.accessKey },
      this.accessTokenSecret,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign({ id: user.id, tokenVersion: user.tokenVersion }, this.refreshTokenSecret, {
      expiresIn: "1d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
