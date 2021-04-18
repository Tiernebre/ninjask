import fetch from "node-fetch";
import { HttpError } from "./http-error";

/**
 * Wrapper function around fetch that automatically handles parsing the JSON,
 * and throws an error if the HTTP status isn't ok. Fetch does not do this by default.
 *
 * @param url The url to fetch.
 */
export const fetchOk = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json() as Promise<T>;
  } else {
    throw new HttpError();
  }
};
