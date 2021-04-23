import { SessionRequest } from "./SessionRequest";
import { SessionTokenBag } from "./SessionTokenBag";

export interface SessionService {
  /**
 * Creates an authenticated session for a given request.
 *
 * @param request The request a user provides to get a session.
 * @returns A session token bag that includes tokens for authentication.
 */
  createOne(request: SessionRequest): Promise<SessionTokenBag>;
}