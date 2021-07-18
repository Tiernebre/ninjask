import { Session } from "../../../src/api";
import { v4 as uuid } from "uuid";

export const generateMockSession = (): Session => ({
  accessToken: uuid(),
  accessTokenExpiration: new Date().getMilliseconds(),
});
