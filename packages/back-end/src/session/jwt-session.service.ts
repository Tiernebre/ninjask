import { UserService } from "../user/user.service";
import { SessionRequest } from "./session-request";
import { SessionTokenBag } from "./session-token-bag";
import { SessionService } from "./session.service";
import jwt, { Secret } from "jsonwebtoken";
import { SessionPayload } from "./session-payload";

export class JwtSessionService implements SessionService {
  private readonly secret: Secret;

  constructor(private readonly userService: UserService, secret?: Secret) {
    if (!secret) {
      throw new Error(
        "Secret is a required environmental property that must be set for JWT sessions."
      );
    }
    this.secret = secret;
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
      this.secret,
      {
        expiresIn: "30m",
      }
    );

    return {
      accessToken,
    };
  }

  verifyOne(accessToken: string): SessionPayload {
    return jwt.verify(accessToken, this.secret) as SessionPayload;
  }
}
