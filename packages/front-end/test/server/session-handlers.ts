import { rest } from "msw";
import { HOST } from "./constants";
import { mockSession } from "../mocks";

export const sessionHandlers = [
  rest.get(`${HOST}session`, (_, res, ctx) => {
    return res(ctx.json(mockSession));
  }),
];
