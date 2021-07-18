import { rest } from "msw";
import { challenges } from "../mocks/challenge/challenges";
import { HOST } from "./constants";
import { isAuthorized } from "./helpers";

export const challengeHandlers = [
  rest.get(`${HOST}/challenges/:challengeId`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { challengeId } = req.params;

    return res(ctx.json(challenges[Number(challengeId)]));
  }),
];
