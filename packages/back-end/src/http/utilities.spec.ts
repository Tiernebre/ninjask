jest.mock("node-fetch", () => jest.fn());

import fetch from "node-fetch";
import { fetchOk } from "./utilities";

const mockedFetch = fetch as unknown as jest.Mock;

describe("utilities", () => {
  describe("fetchOk", () => {
    it("returns the json from the fetch response", async () => {
      const expected = { foo: "bar" };
      mockedFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(expected),
        ok: true,
      });
      const response = await fetchOk("localhost");
      expect(response).toEqual(expected);
    });

    it("throws an http error if the response was not ok", async () => {
      mockedFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
        ok: false,
      });
      await expect(fetchOk("localhost")).rejects.toThrowError(
        new Error("An HTTP Error Occurred")
      );
    });
  });
});
