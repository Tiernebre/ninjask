import { HttpClient } from "../http";
import { SessionRequest } from "./SessionRequest";
import { SessionService } from "./SessionService";
import { SessionTokenBag } from "./SessionTokenBag";

export class HttpSessionService implements SessionService {
  private readonly URI = "sessions"

  constructor(private readonly httpClient: HttpClient) {}

  async createOne(request: SessionRequest): Promise<SessionTokenBag> {
    return this.httpClient.post<SessionTokenBag>(
      this.URI,
      request
    );
  }

  async refreshOne(): Promise<SessionTokenBag> {
    return this.httpClient.put<SessionTokenBag>(this.URI);
  }
}
