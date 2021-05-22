import { Repository } from "typeorm";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";
import { ChallengeParticipantService } from "./challenge-participant.service";
import { object, when } from "testdouble";
import { generateRandomNumber } from "../random";
import { generateMockChallengeParticipantEntity } from "./challenge.mock";

describe("ChallengeParticipantService", () => {
  let challengeParticipantService: ChallengeParticipantService;
  let challengeParticipantRepository: Repository<ChallengeParticipantEntity>;

  beforeEach(() => {
    challengeParticipantRepository =
      object<Repository<ChallengeParticipantEntity>>();
    challengeParticipantService = new ChallengeParticipantService(
      challengeParticipantRepository
    );
  });

  describe("createOne", () => {
    it("returns the created challenge participant", async () => {
      const userId = generateRandomNumber();
      const challengeId = generateRandomNumber();
      const challengeParticipantEntity =
        generateMockChallengeParticipantEntity();
      challengeParticipantEntity.userId = userId;
      challengeParticipantEntity.challengeId = challengeId;
      when(
        challengeParticipantRepository.create({ userId, challengeId })
      ).thenReturn(challengeParticipantEntity);
      when(
        challengeParticipantRepository.save(challengeParticipantEntity)
      ).thenResolve(challengeParticipantEntity);
      const createdUser = await challengeParticipantService.createOne(
        userId,
        challengeId
      );
      expect(createdUser.id).toEqual(challengeParticipantEntity.id);
      expect(createdUser.userId).toEqual(challengeParticipantEntity.userId);
      expect(createdUser.challengeId).toEqual(
        challengeParticipantEntity.challengeId
      );
    });
  });

  describe("updateOne", () => {
    it("returns the update challenge participant", async () => {
      const id = generateRandomNumber();
      const userId = generateRandomNumber();
      const challengeParticipantEntity =
        generateMockChallengeParticipantEntity();
      const completionTimeHour = generateRandomNumber();
      const completionTimeMinutes = generateRandomNumber();
      when(
        challengeParticipantRepository.findOne({
          id,
          userId,
        })
      ).thenResolve(challengeParticipantEntity);
      challengeParticipantEntity.completionTimeHour = completionTimeHour;
      challengeParticipantEntity.completionTimeMinutes = completionTimeMinutes;
      when(
        challengeParticipantRepository.save(challengeParticipantEntity)
      ).thenResolve(challengeParticipantEntity);
      const updatedChallengeParticipant =
        await challengeParticipantService.updateOne({
          id,
          userId,
          completionTimeHour,
          completionTimeMinutes,
        });
      expect(updatedChallengeParticipant.id).toEqual(
        challengeParticipantEntity.id
      );
      expect(updatedChallengeParticipant.completionTimeHour).toEqual(
        completionTimeHour
      );
      expect(updatedChallengeParticipant.completionTimeMinutes).toEqual(
        completionTimeMinutes
      );
    });

    it("throws an error if the challenge participant was not found given the request information", async () => {
      const id = generateRandomNumber();
      const userId = generateRandomNumber();
      const completionTimeHour = generateRandomNumber();
      const completionTimeMinutes = generateRandomNumber();
      when(
        challengeParticipantRepository.findOne({
          id,
          userId,
        })
      ).thenResolve(undefined);
      await expect(
        challengeParticipantService.updateOne({
          id,
          userId,
          completionTimeHour,
          completionTimeMinutes,
        })
      ).rejects.toThrowError();
    });
  });
});
