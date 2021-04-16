/**
 * Error that describes an HTTP Client Error (4xx status code).
 *
 * You may be wondering why HttpClient is seperated from HttpServer: this is
 * actually an important distinction:
 *
 * - Http Client means that the client made an error in their request, this means it was user error.
 * - Http Server means that the server cannot even process the request for whatever reason, even if the request is fully 100% valid.
 */
export class HttpServerError extends Error {
  public constructor(message: string) {
    super(message);
  }
}
