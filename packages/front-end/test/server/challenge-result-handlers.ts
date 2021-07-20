import { rest } from "msw";
import { generateChallengeResult } from "../mocks";
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
  rest.post(`${HOST}challenges/:challengeId/participants`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    const { challengeId } = req.params;
    const challengeResultsToAddTo = challengeResults[Number(challengeId)];
    const newResult = generateChallengeResult();
    challengeResultsToAddTo.push(newResult);

    return res(ctx.json(challengeResultsToAddTo));
  }),
  rest.delete(
    `${HOST}challenges/:challengeId/participants/me`,
    (req, res, ctx) => {
      if (!isAuthorized(req)) {
        return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
      }

      const { challengeId } = req.params;
      const challengeResultsToRemoveFrom =
        challengeResults[Number(challengeId)];
      challengeResultsToRemoveFrom.pop();

      return res(ctx.json(challengeResultsToRemoveFrom));
    }
  ),
];
