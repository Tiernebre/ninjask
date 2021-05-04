import { HttpClient } from "../http";
import { Draft } from "./Draft";
import { DraftService } from "./DraftService";

export class HttpDraftService implements DraftService {
  constructor(private readonly httpClient: HttpClient) {}

  getOneForChallengeId(id: number): Promise<Draft> {
    return this.httpClient.get(`challenges/${id}/draft`);
  }
}
