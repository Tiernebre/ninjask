import { Challenge } from "../../../src/api";
import { v4 as uuid } from "uuid";

export const generateMockChallenge = (): Challenge => ({
  id: 1,
  name: uuid(),
  description: uuid(),
  versionId: 1,
  creatorId: 1,
});
