import { UserService } from "../user/user.service";
import { SessionRequest } from "./session-request";
import { SessionTokenBag } from "./session-token-bag";
import { SessionService } from "./session.service";
import jwt, { Secret } from "jsonwebtoken";
import { SessionPayload } from "./session-payload";

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

    const accessToken = jwt.sign(
      { id: associatedUser.id, accessKey: associatedUser.accessKey },
      this.accessTokenSecret,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign({}, this.refreshTokenSecret, {
      expiresIn: "1d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyOne(accessToken: string): SessionPayload {
    return jwt.verify(accessToken, this.accessTokenSecret) as SessionPayload;
  }

  refreshOne(refreshToken: string): Promise<SessionTokenBag> {
    throw new Error("Method not implemented.");
  }
}
