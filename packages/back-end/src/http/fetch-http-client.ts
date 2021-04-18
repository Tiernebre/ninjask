import { HttpClient } from "./http-client";
import { fetchOk } from "./utilities";

export class FetchHttpClient implements HttpClient {
  constructor(private readonly url: string) {}

  async get<T>(uri: string): Promise<T> {
    return fetchOk<T>(`${this.url}/${uri}`);
  }
}
