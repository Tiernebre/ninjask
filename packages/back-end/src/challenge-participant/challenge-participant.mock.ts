import { ChallengeParticipantEntity } from "./challenge-participant.entity";
import { ChallengeParticipant } from "./challenge-participant";
import { generateRandomNumber } from "../random";

export const generateMockChallengeParticipantEntity =
  (): ChallengeParticipantEntity => {
    const challengeResultEntity = new ChallengeParticipantEntity();
    challengeResultEntity.id = generateRandomNumber();
    challengeResultEntity.userId = generateRandomNumber();
    challengeResultEntity.challengeId = generateRandomNumber();
    challengeResultEntity.completionTimeHour = generateRandomNumber();
    challengeResultEntity.completionTimeMinutes = generateRandomNumber();
    return challengeResultEntity;
  };

export const generateMockChallengeParticipant = (): ChallengeParticipant => ({
  id: generateRandomNumber(),
  userId: generateRandomNumber(),
  challengeId: generateRandomNumber(),
  completionTimeHour: generateRandomNumber(),
  completionTimeMinutes: generateRandomNumber(),
});
