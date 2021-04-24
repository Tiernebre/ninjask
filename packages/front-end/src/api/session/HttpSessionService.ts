import { HttpClient } from "../http";
import { SessionRequest } from "./SessionRequest";
import { SessionService } from "./SessionService";
import { SessionTokenBag } from "./SessionTokenBag";

export class HttpSessionService implements SessionService {
  private readonly URI = "sessions"
  private readonly CURRENT_SESSION_URI = `${this.URI}/current-session`

  constructor(private readonly httpClient: HttpClient) {}

  async createOne(request: SessionRequest): Promise<SessionTokenBag> {
    return this.httpClient.post<SessionTokenBag>(
      this.URI,
      request
    );
  }

  async refreshCurrentSession(): Promise<SessionTokenBag> {
    return this.httpClient.put<SessionTokenBag>(this.CURRENT_SESSION_URI);
  }

  async deleteCurrentSession(): Promise<void> {
    return this.httpClient.delete(this.CURRENT_SESSION_URI);
  }
}
