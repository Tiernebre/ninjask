import { HttpClient } from "./http-client";
import fetch from 'node-fetch';
import { HttpError } from "./http-error";

export class FetchHttpClient implements HttpClient {
  constructor (
    private readonly url: string
  ) {}


  async get<T>(uri: string): Promise<T> {
    const response = await fetch(`${this.url}/${uri}`)
    if (response.ok) {
      return response.json() as Promise<T>
    } else {
      throw new HttpError()
    }
  }
}