import { rest } from "msw";
import { mockSession } from "../mocks";

export const sessionHandlers = [
  rest.post("/sessions", async (_, res, ctx) => {
    return res(ctx.json({ mockSession }));
  }),
];
