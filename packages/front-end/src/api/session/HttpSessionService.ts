import { HttpClient } from "../http";
import { SessionRequest } from "./SessionRequest";
import { SessionService } from "./SessionService";
import { SessionTokenBag } from "./SessionTokenBag";

export class HttpSessionService implements SessionService {
  constructor(private readonly httpClient: HttpClient) {}

  async createOne(request: SessionRequest): Promise<SessionTokenBag> {
    console.log(
      "DEBUG -- Session Request has been received and will be processed. Request = ",
      request
    );
    const tokenBag = await this.httpClient.post<SessionTokenBag>(
      "sessions",
      request
    );
    console.log("DEBUG -- Got back token bag ", tokenBag);
    return tokenBag;
  }

  async refreshOne(): Promise<SessionTokenBag> {
    throw new Error("Method not implemented.");
  }
}
