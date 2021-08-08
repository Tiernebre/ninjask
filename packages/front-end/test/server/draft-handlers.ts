import { rest } from "msw";
import { draftPools } from "../mocks/draft";
import { HOST } from "./constants";
import { isAuthorized } from "./helpers";

export const draftHandlers = [
  rest.post(`${HOST}drafts/:id/pool`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { id } = req.params;
    const pool = draftPools[Number(id)];

    return res(ctx.json(pool));
  }),
  rest.get(`${HOST}drafts/:id/pool`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { id } = req.params;
    const pool = draftPools[Number(id)];

    return res(ctx.json(pool));
  }),
  rest.post(`${HOST}drafts/:id/selections`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { id } = req.params;
    const selections = draftPools[Number(id)];

    return res(ctx.json(selections));
  }),
  rest.get(`${HOST}drafts/:id/selections`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { id } = req.params;
    const selections = draftPools[Number(id)];

    return res(ctx.json(selections));
  }),
];
