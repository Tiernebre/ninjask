import { SessionRequest } from "./session-request";
import { SessionTokenBag } from "./session-token-bag";
import { SessionService } from "./session.service";

export class JwtSessionService implements SessionService {
  createOne(request: SessionRequest): Promise<SessionTokenBag> {
    throw new Error("Method not implemented.");
  }
}