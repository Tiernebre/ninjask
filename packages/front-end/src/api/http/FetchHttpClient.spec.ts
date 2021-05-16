import { FetchHttpClient } from "./FetchHttpClient";
import fetchMock from "fetch-mock-jest";
import { HttpClientError } from "./HttpClientError";
import { HttpServerError } from "./HttpServerError";

const rootUrl = "http://localhost";

const HTTP_CLIENT_ERROR_CODES = [
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 418, 421, 422, 432, 424, 425, 428, 429, 431, 451,
];

const HTTP_SERVER_ERROR_CODES = [500, 501, 502, 503, 504];

describe("FetchHttpClient", () => {
  let fetchHttpClient: FetchHttpClient;

  beforeEach(() => {
    fetchMock.reset();
    fetchHttpClient = new FetchHttpClient(rootUrl);
  });

  describe("get", () => {
    it("returns a response from a provided URI", async () => {
      const uri = "/foo";
      const expected = { foo: "bar" };
      fetchMock.get(`${rootUrl}${uri}`, expected);
      const response = await fetchHttpClient.get(uri);
      expect(response).toEqual(expected);
    });

    it.each(HTTP_CLIENT_ERROR_CODES)(
      "throws an HttpClientError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.get(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.get(uri)).rejects.toThrow(HttpClientError);
      }
    );

    it.each(HTTP_SERVER_ERROR_CODES)(
      "throws an HttpServerError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.get(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.get(uri)).rejects.toThrow(HttpServerError);
      }
    );
  });

  describe("post", () => {
    it("returns a response from a provided URI", async () => {
      const uri = "/foo";
      const expected = { foo: "bar" };
      fetchMock.post(`${rootUrl}${uri}`, expected);
      const response = await fetchHttpClient.post(uri);
      expect(response).toEqual(expected);
    });

    it("returns a response from a provided URI with a given request body", async () => {
      const uri = "/foo";
      const requestBody = { name: "test-name" };
      const expected = { foo: "bar" };
      fetchMock.post(`${rootUrl}${uri}`, expected, {
        body: requestBody,
      });
      const response = await fetchHttpClient.post(uri, requestBody);
      expect(response).toEqual(expected);
    });

    it.each(HTTP_CLIENT_ERROR_CODES)(
      "throws an HttpClientError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.post(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.post(uri)).rejects.toThrow(
          HttpClientError
        );
      }
    );

    it.each(HTTP_SERVER_ERROR_CODES)(
      "throws an HttpServerError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.post(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.post(uri)).rejects.toThrow(
          HttpServerError
        );
      }
    );
  });

  describe("put", () => {
    it("returns a response from a provided URI", async () => {
      const uri = "/foo";
      const expected = { foo: "bar" };
      fetchMock.put(`${rootUrl}${uri}`, expected);
      const response = await fetchHttpClient.put(uri);
      expect(response).toEqual(expected);
    });

    it("returns a response from a provided URI with a given request body", async () => {
      const uri = "/foo";
      const requestBody = { name: "test-name" };
      const expected = { foo: "bar" };
      fetchMock.put(`${rootUrl}${uri}`, expected, {
        body: requestBody,
      });
      const response = await fetchHttpClient.put(uri, requestBody);
      expect(response).toEqual(expected);
    });

    it.each(HTTP_CLIENT_ERROR_CODES)(
      "throws an HttpClientError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.put(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.put(uri)).rejects.toThrow(HttpClientError);
      }
    );

    it.each(HTTP_SERVER_ERROR_CODES)(
      "throws an HttpServerError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.put(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.put(uri)).rejects.toThrow(HttpServerError);
      }
    );
  });

  describe("delete", () => {
    it.each(HTTP_CLIENT_ERROR_CODES)(
      "throws an HttpClientError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.delete(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.delete(uri)).rejects.toThrow(
          HttpClientError
        );
      }
    );

    it.each(HTTP_SERVER_ERROR_CODES)(
      "throws an HttpServerError if the response status back was %p",
      async (httpClientStatusCode: number) => {
        const uri = "/foo";
        fetchMock.delete(`${rootUrl}${uri}`, httpClientStatusCode);
        await expect(fetchHttpClient.delete(uri)).rejects.toThrow(
          HttpServerError
        );
      }
    );
  });
});
