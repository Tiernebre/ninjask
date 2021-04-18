import { generateMockChallenge } from "../challenge/challenge.mock";
import { generateRandomNumber } from "../random";
import { DraftEntity } from "./draft.entity";

export const generateMockDraftEntity = (): DraftEntity => {
  const draftEntity = new DraftEntity();
  draftEntity.id = generateRandomNumber();
  draftEntity.poolSize = generateRandomNumber();
  draftEntity.pokemon = [];
  draftEntity.challenge = Promise.resolve(generateMockChallenge());
  return draftEntity;
};
