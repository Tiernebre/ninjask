import { HttpClient } from "../http";
import { SessionRequest } from "./SessionRequest";
import { SessionService } from "./SessionService";
import { Session } from "./SessionTokenBag";

export class HttpSessionService implements SessionService {
  private readonly URI = "sessions";
  private readonly CURRENT_SESSION_URI = `${this.URI}/current-session`;

  constructor(private readonly httpClient: HttpClient) {}

  async createOne(request: SessionRequest): Promise<Session> {
    return this.httpClient.post<Session>(this.URI, request);
  }

  async refreshCurrentSession(): Promise<Session> {
    return this.httpClient.put<Session>(this.CURRENT_SESSION_URI);
  }

  async deleteCurrentSession(): Promise<void> {
    return this.httpClient.delete(this.CURRENT_SESSION_URI);
  }
}
