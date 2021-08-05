import { rest } from "msw";
import { leagues } from "../mocks/league";
import { HOST } from "./constants";
import { isAuthorized } from "./helpers";

export const leagueHandlers = [
  rest.get(`${HOST}leagues`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }
    return res(ctx.json(Object.values(leagues)));
  }),

  rest.get(`${HOST}leagues/:id`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { id } = req.params;
    const foundLeague = leagues[Number(id)];

    if (!foundLeague) {
      return res(ctx.status(404), ctx.json({ message: "League Not Found" }));
    }

    return res(ctx.json(foundLeague));
  }),
];
