import { rest } from "msw";
import { versions } from "../mocks/versions";
import { HOST } from "./constants";
import { isAuthorized } from "./helpers";

export const versionsHandler = [
  rest.get(`${HOST}versions`, (req, res, ctx) => {
    if (!isAuthorized(req)) {
      return res(ctx.status(403), ctx.json({ message: "Not Authorized" }));
    }

    return res(ctx.json(versions));
  }),
];
