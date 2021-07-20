import { rest } from "msw";
import { challengeResults } from "../mocks/challenge-results/results";
import { HOST } from "./constants";
import { isAuthorized } from "./helpers";

export const challengeResultHandlers = [
  rest.get(`${HOST}challenges/:challengeId/results`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { challengeId } = req.params;

    return res(ctx.json(challengeResults[Number(challengeId)]));
  }),
];
