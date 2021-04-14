export interface HttpClient {
  /**
   * Performs an HTTP GET operation for a given URI.
   * @param uri The URI of a resource to perform a GET operation on.
   */
  get<T>(uri: string): T;
}