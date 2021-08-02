import { Season } from "../../../src/api";
import { generateRandomNumber, generateRandomString } from "../../random";

export const generateSeason = (): Season => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  description: generateRandomString(),
});
