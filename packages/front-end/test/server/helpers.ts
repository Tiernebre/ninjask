import { RestRequest } from "msw";

export const isAuthorized = (req: RestRequest): boolean => {
  return !!req.headers.get("Authorization");
};
