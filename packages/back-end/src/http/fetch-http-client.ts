import { HttpClient } from "./http-client";

export class FetchHttpClient implements HttpClient {
  get<T>(uri: string): T {
    throw new Error("Method not implemented.");
  }
}