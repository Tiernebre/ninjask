import { SessionRequest } from "./SessionRequest";
import { Session } from "./Session";
import { SessionPayload } from ".";

export interface SessionService {
  /**
   * Creates an authenticated session for a given request.
   *
   * @param request The request a user provides to get a session.
   * @returns A session token bag that includes tokens for authentication.
   */
  createOne(request: SessionRequest): Promise<Session>;

  /**
   * Refreshes the current authenticated session.
   *
   * @returns A session token bag that includes tokens for the newly refreshed authentication.
   */
  refreshCurrentSession(): Promise<Session>;

  /**
   * Deletes the current authenticated session.
   */
  deleteCurrentSession(): Promise<void>;

  /**
   * Determines if a given access token is valid.
   *
   * @returns true if the token is not expired and valid, false otherwise.
   */
  accessTokenIsValid(accessToken: string): boolean;

  /**
   * Returns a decoded session payload from a given access token.
   *
   * @param accessToken The access token to parse a session payload out of.
   * @returns The decoded session payload from the given access token.
   */
  getSessionPayloadFromAccessToken(accessToken: string): SessionPayload;
}
