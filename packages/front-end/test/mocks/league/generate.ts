import { League } from "../../../src/api";
import { generateRandomNumber, generateRandomString } from "../../random";

export const generateLeague = (): League => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  description: generateRandomString(),
  creatorId: generateRandomNumber(),
});
