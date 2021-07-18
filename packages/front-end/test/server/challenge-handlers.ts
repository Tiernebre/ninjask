import { rest } from "msw";

export const challengeHandlers = [
  rest.get("/challenges/:challengeId", (req, res, ctx) => {}),
];
