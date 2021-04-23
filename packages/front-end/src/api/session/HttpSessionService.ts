import { SessionRequest } from "./SessionRequest";
import { SessionService } from "./SessionService";
import { SessionTokenBag } from "./SessionTokenBag";

export class HttpSessionService implements SessionService {
  createOne(request: SessionRequest): Promise<SessionTokenBag> {
    throw new Error("Method not implemented.");
  }
}