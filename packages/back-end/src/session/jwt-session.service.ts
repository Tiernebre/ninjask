import { UserService } from "../user/user.service";
import { SessionRequest } from "./session-request";
import { SessionTokenBag } from "./session-token-bag";
import { SessionService } from "./session.service";
import jwt, { Secret } from 'jsonwebtoken'

export class JwtSessionService implements SessionService {
  constructor(
    private readonly userService: UserService,
    private readonly secret: Secret
  ) {
    if (!this.secret) {
      throw new Error('Secret is a required environmental property that must be set for JWT sessions.')
    }
  }
  async createOne({ accessKey, password }: SessionRequest): Promise<SessionTokenBag> {
    const associatedUser = await this.userService.findOneWithAccessKeyAndPassword(accessKey, password);

    const accessToken = jwt.sign({ id: associatedUser.id, accessKey: associatedUser.accessKey }, this.secret, {
      expiresIn: '30m'
    })

    return {
      accessToken
    }
  }

  verifyOne(accessToken: string): void {
    jwt.verify(accessToken, this.secret)
  }
}