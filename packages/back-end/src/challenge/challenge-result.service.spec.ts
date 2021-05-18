import { Repository } from "typeorm";
import { ChallengeResultEntity } from "./challenge-result.entity";
import { ChallengeResultService } from "./challenge-result.service";
import { object, when } from "testdouble";
import { generateRandomNumber } from "../random";
import { generateMockChallengeResultEntity } from "./challenge.mock";

describe("ChallengeResultService", () => {
  let challengeResultService: ChallengeResultService;
  let challengeResultRepository: Repository<ChallengeResultEntity>;

  beforeEach(() => {
    challengeResultRepository = object<Repository<ChallengeResultEntity>>();
    challengeResultService = new ChallengeResultService(
      challengeResultRepository
    );
  });

  describe("createOne", () => {
    it("returns the created challenge result", async () => {
      const userId = generateRandomNumber();
      const challengeId = generateRandomNumber();
      const challengeResultEntity = generateMockChallengeResultEntity();
      challengeResultEntity.userId = userId;
      challengeResultEntity.challengeId = challengeId;
      when(
        challengeResultRepository.create({ userId, challengeId })
      ).thenReturn(challengeResultEntity);
      when(challengeResultRepository.save(challengeResultEntity)).thenResolve(
        challengeResultEntity
      );
      const createdUser = await challengeResultService.createOne(
        userId,
        challengeId
      );
      expect(createdUser.id).toEqual(challengeResultEntity.id);
      expect(createdUser.userId).toEqual(challengeResultEntity.userId);
      expect(createdUser.challengeId).toEqual(
        challengeResultEntity.challengeId
      );
    });
  });

  describe("updateOne", () => {
    it("returns the update challenge result", async () => {
      const id = generateRandomNumber();
      const userId = generateRandomNumber();
      const challengeResultEntity = generateMockChallengeResultEntity();
      const completionTimeHour = generateRandomNumber();
      const completionTimeMinutes = generateRandomNumber();
      when(
        challengeResultRepository.findOne({
          id,
          userId,
        })
      ).thenResolve(challengeResultEntity);
      challengeResultEntity.completionTimeHour = completionTimeHour;
      challengeResultEntity.completionTimeMinutes = completionTimeMinutes;
      when(challengeResultRepository.save(challengeResultEntity)).thenResolve(
        challengeResultEntity
      );
      const updatedChallengeResult = await challengeResultService.updateOne({
        id,
        userId,
        completionTimeHour,
        completionTimeMinutes,
      });
      expect(updatedChallengeResult.id).toEqual(challengeResultEntity.id);
      expect(updatedChallengeResult.completionTimeHour).toEqual(
        completionTimeHour
      );
      expect(updatedChallengeResult.completionTimeMinutes).toEqual(
        completionTimeMinutes
      );
    });

    it("throws an error if the challenge result was not found given the request information", async () => {
      const id = generateRandomNumber();
      const userId = generateRandomNumber();
      const completionTimeHour = generateRandomNumber();
      const completionTimeMinutes = generateRandomNumber();
      when(
        challengeResultRepository.findOne({
          id,
          userId,
        })
      ).thenResolve(undefined);
      await expect(
        challengeResultService.updateOne({
          id,
          userId,
          completionTimeHour,
          completionTimeMinutes,
        })
      ).rejects.toThrowError();
    });
  });
});
