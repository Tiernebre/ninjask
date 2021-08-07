import { rest } from "msw";
import { seasons } from "../mocks";
import { HOST } from "./constants";
import { isAuthorized } from "./helpers";

export const seasonHandlers = [
  rest.get(`${HOST}seasons`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }
    return res(ctx.json(Object.values(seasons)));
  }),

  rest.get(`${HOST}seasons/:id`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { id } = req.params;
    const season = seasons[Number(id)];

    if (!season) {
      return res(ctx.status(404), ctx.json({ message: "Season Not Found" }));
    }

    return res(ctx.json(season));
  }),
];
