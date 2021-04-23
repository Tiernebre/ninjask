import { SessionRequest } from "./SessionRequest";
import { SessionService } from "./SessionService";
import { SessionTokenBag } from "./SessionTokenBag";

export class HttpSessionService implements SessionService {
  createOne(request: SessionRequest): Promise<SessionTokenBag> {
    console.log('DEBUG -- Session Request has been received and will be processed. Request = ', request)
    return Promise.resolve({ accessToken: '' })
  }
}