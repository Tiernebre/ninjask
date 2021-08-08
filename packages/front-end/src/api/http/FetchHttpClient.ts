import { HttpClient } from "./HttpClient";
import { HttpClientError } from "./HttpClientError";
import { HttpServerError } from "./HttpServerError";

/**
 * Specific HTTP Client implementation that uses the Fetch API
 * as the mechanism for making HTTP requests.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */
export class FetchHttpClient implements HttpClient {
  private readonly rootUrl: string;

  public constructor(rootUrl?: string, private readonly accessToken?: string) {
    if (!rootUrl) {
      throw new Error(
        "HTTP Client could not be instantiated due to missing rootUrl."
      );
    }

    this.rootUrl = rootUrl;
  }

  public async get<T>(uri: string): Promise<T> {
    const response = await fetch(`${this.rootUrl}${uri}`, {
      ...this.getCommonConfiguration(),
      method: "GET",
    });
    return this.parseResponse(response);
  }

  public async post<T>(uri: string, request?: unknown): Promise<T> {
    const response = await fetch(`${this.rootUrl}${uri}`, {
      ...this.getCommonConfiguration(),
      method: "POST",
      body: JSON.stringify(request),
    });
    return this.parseResponse(response);
  }

  public async put<T>(uri: string, request?: unknown): Promise<T> {
    const response = await fetch(`${this.rootUrl}${uri}`, {
      ...this.getCommonConfiguration(),
      method: "PUT",
      body: JSON.stringify(request),
    });
    return this.parseResponse(response);
  }

  public async delete(uri: string): Promise<void> {
    const response = await fetch(`${this.rootUrl}${uri}`, {
      ...this.getCommonConfiguration(),
      method: "DELETE",
    });
    this.checkResponseForErrors(response);
  }

  public async patch<T>(uri: string, request?: unknown): Promise<T> {
    const response = await fetch(`${this.rootUrl}${uri}`, {
      ...this.getCommonConfiguration(),
      method: "PATCH",
      body: JSON.stringify(request),
    });
    return this.parseResponse(response);
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      try {
        const json = (await response.json()) as Promise<T>;
        return json;
      } catch (error) {
        return {} as T;
      }
    } else {
      if (response.status >= 500) {
        throw new HttpServerError(
          `HTTP Server Error ${response.status} occurred.`
        );
      } else {
        throw new HttpClientError(
          `HTTP Client Error ${response.status} occurred.`
        );
      }
    }
  }

  private checkResponseForErrors(response: Response): void {
    if (response.status >= 500) {
      throw new HttpServerError(
        `HTTP Server Error ${response.status} occurred.`
      );
    } else if (response.status >= 400) {
      throw new HttpClientError(
        `HTTP Client Error ${response.status} occurred.`
      );
    }
  }

  private getCommonConfiguration(): RequestInit {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    if (this.accessToken) {
      headers.set("Authorization", this.accessToken);
    }

    return {
      headers,
      credentials: "include",
    };
  }
}
