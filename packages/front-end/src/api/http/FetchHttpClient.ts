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

  public constructor(rootUrl?: string) {
    if (!rootUrl) {
      throw new Error(
        "HTTP Client could not be instantiated due to missing rootUrl."
      );
    }

    this.rootUrl = rootUrl;
  }

  public async get<T>(uri: string): Promise<T> {
    const response = await fetch(`${this.rootUrl}${uri}`);
    return this.parseResponse(response);
  }

  public async post<T>(uri: string, request?: any): Promise<T> {
    const response = await fetch(`${this.rootUrl}${uri}`, {
      ...this.getCommonConfiguration(),
      method: "POST",
      body: JSON.stringify(request),
    });
    return this.parseResponse(response);
  }

  public async put<T>(uri: string, request?: any): Promise<T> {
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
    this.checkResponseForErrors(response)
  }

  private parseResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.json();
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

  private checkResponseForErrors(response: Response): Promise<void> {
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

  private getCommonConfiguration(): RequestInit {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
  }
}
