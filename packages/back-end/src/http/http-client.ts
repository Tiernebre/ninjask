export interface HttpClient {
  /**
   * Performs an HTTP GET operation for a given URI.
   * @param uri The URI of a resource to perform a GET operation on.
   * @returns The response body in the form of a JSON object.
   */
  get<T>(uri: string): Promise<T>;
}