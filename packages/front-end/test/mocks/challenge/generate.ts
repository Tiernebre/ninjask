import { Challenge } from "../../../src/api";
import { v4 as uuid } from "uuid";
import { generateRandomNumber } from "../../random/random";

export const generateMockChallenge = (): Challenge => ({
  id: generateRandomNumber(),
  name: `Challenge - ${uuid()}`,
  description: `Challenge Description - ${uuid()}`,
  versionId: generateRandomNumber(),
  creatorId: generateRandomNumber(),
});
