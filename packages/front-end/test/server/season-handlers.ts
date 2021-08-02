import { rest } from "msw";
import { HOST } from "./constants";
import { mockSeasons } from "../mocks";
import { isAuthorized } from "./helpers";

export const seasonHandlers = [
  rest.get(`${HOST}seasons`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }
    return res(ctx.json(mockSeasons));
  }),
];
