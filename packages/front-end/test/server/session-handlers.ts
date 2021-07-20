import { rest } from "msw";
import { HOST } from "./constants";
import { mockSession } from "../mocks";

export const sessionHandlers = [
  rest.post(`${HOST}sessions`, (_, res, ctx) => {
    return res(ctx.json(mockSession));
  }),
];
