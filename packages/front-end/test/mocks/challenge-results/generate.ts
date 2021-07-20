import { ChallengeResult } from "../../../src/api/challenge/ChallengeResult";
import { Writeable } from "../../types";
import {
  generateRandomNumber,
  generateRandomString,
  getRandomInt,
} from "../../random";

export const generateChallengeResult = (): Writeable<ChallengeResult> => {
  return {
    participantId: generateRandomNumber(),
    nickname: generateRandomString(),
    completionTimeHour: getRandomInt(1, 98),
    completionTimeMinutes: getRandomInt(1, 59),
    resultId: generateRandomNumber(),
  };
};
