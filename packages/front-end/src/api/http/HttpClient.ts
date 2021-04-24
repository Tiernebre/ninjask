/**
 * Wrapper over HTTP client operations.
 *
 * Why not just fetch you may ask?
 *
 * There are some benefits to this wrapper approach:
 *
 * - Interface-driven design allows for the HTTP client to evolve over time without affecting other React components.
 * - We can intercept requests and responses to ensure stateful authentication and other things much easier.
 * - Can be mocked and injected into testing suites much easier.
 *
 */
export interface HttpClient {
  /**
   * Performs an HTTP GET request and returns the response body
   * in the form of a JavaScript Object.
   *
   * @param uri The URI of the specific HTTP resource to retrieve.
   * @throws HttpClientError if the HTTP response has a 4xx status code.
   * @throws HttpServerError if the HTTP response has a 5xx status code.
   */
  get<T>(uri: string): Promise<T>;

  /**
   * Performs an HTTP POST request with an optionally provided request object
   * and returns the response body in the form of a JavaScript Object.
   *
   * @param uri The URI of the specific HTTP resource to retrieve.
   * @param request An optional parameter that represents the request body to send over.
   * @throws HttpClientError if the HTTP response has a 4xx status code.
   * @throws HttpServerError if the HTTP response has a 5xx status code.
   */
  post<T>(uri: string, request?: any): Promise<T>;

  /**
   * Performs an HTTP PUT request with an optionally provided request object
   * and returns the response body in the form of a JavaScript Object.
   *
   * @param uri The URI of the specific HTTP resource to retrieve.
   * @param request An optional parameter that represents the request body to send over.
   * @throws HttpClientError if the HTTP response has a 4xx status code.
   * @throws HttpServerError if the HTTP response has a 5xx status code.
   */
  put<T>(uri: string, request?: any): Promise<T>;

  /**
   * Performs an HTTP DELETE request with an optionally provided request object
   * and returns the response body in the form of a JavaScript Object.
   *
   * @param uri The URI of the specific HTTP resource to retrieve.
   * @throws HttpClientError if the HTTP response has a 4xx status code.
   * @throws HttpServerError if the HTTP response has a 5xx status code.
   */
  delete(uri: string): Promise<void>;
}
