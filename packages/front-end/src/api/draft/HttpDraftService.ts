import { HttpClient } from "../http";
import { Pokemon } from "../pokemon";
import { Draft } from "./Draft";
import { DraftService } from "./DraftService";

export class HttpDraftService implements DraftService {
  constructor(private readonly httpClient: HttpClient) {}

  getOneForChallengeId(id: number): Promise<Draft> {
    return this.httpClient.get(`challenges/${id}/draft`);
  }

  getPoolForOneWithId(id: number): Promise<Pokemon[]> {
    return this.httpClient.get(`drafts/${id}/pool`);
  }
}
