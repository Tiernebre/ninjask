import { rest } from "msw";
import { challengeDrafts, challenges } from "../mocks/challenge/challenges";
import { HOST } from "./constants";
import { isAuthorized } from "./helpers";

export const challengeHandlers = [
  rest.get(`${HOST}challenges`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }
    return res(ctx.json(challenges));
  }),
  rest.get(`${HOST}challenges/:challengeId`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { challengeId } = req.params;

    return res(ctx.json(challenges[Number(challengeId)]));
  }),
  rest.get(`${HOST}challenges/:challengeId/draft`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { challengeId } = req.params;

    return res(ctx.json(challengeDrafts[Number(challengeId)]));
  }),
  rest.delete(`${HOST}challenges/:challengeId`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { challengeId } = req.params;

    delete challenges[Number(challengeId)];

    return res();
  }),
];
