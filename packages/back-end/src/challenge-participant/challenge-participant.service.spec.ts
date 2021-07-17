import { Repository } from "typeorm";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";
import { ChallengeParticipantService } from "./challenge-participant.service";
import { object, when } from "testdouble";
import { generateRandomNumber, getRandomInt } from "../random";
import { generateMockChallengeParticipantEntity } from "./challenge-participant.mock";
import { INVALID_NUMBER_CASES } from "../test/cases";
import { ZodError } from "zod";
import { ChallengeParticipantUpdateRequest } from "./challenge-participant-update-request";
import { NotFoundError } from "../error/not-found-error";

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

    it.each([INVALID_NUMBER_CASES])(
      "throws a ZodError if the userId provided is %p",
      async (userId) => {
        await expect(
          challengeParticipantService.createOne(userId as number, 1)
        ).rejects.toThrowError(ZodError);
      }
    );

    it.each([INVALID_NUMBER_CASES])(
      "throws a ZodError if the challengeId provided is %p",
      async (challengeId) => {
        await expect(
          challengeParticipantService.createOne(1, challengeId as number)
        ).rejects.toThrowError(ZodError);
      }
    );
  });

  describe("updateOne", () => {
    it("returns the update challenge participant", async () => {
      const id = generateRandomNumber();
      const userId = generateRandomNumber();
      const challengeParticipantEntity =
        generateMockChallengeParticipantEntity();
      const completionTimeHour = getRandomInt(0, 59);
      const completionTimeMinutes = getRandomInt(0, 59);
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

    it("throws a NotFoundError if the challenge participant was not found given the request information", async () => {
      const id = generateRandomNumber();
      const userId = generateRandomNumber();
      const completionTimeHour = getRandomInt(0, 59);
      const completionTimeMinutes = getRandomInt(0, 59);
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
      ).rejects.toThrowError(NotFoundError);
    });

    it.each([
      {},
      { id: 1 },
      { id: 1, userId: 1 },
      { id: 1, userId: 1, completionTimeHour: 1 },
      { id: 1, userId: 1, completionTimeMinutes: 1 },
      {
        id: "1",
        userId: "1",
        completionTimeHour: "1",
        completionTimeMinutes: "1",
      },
      { id: 1, userId: 1, completionTimeHour: "1", completionTimeMinutes: "1" },
      { id: 1, userId: 1, completionTimeHour: -1, completionTimeMinutes: 1 },
      { id: 1, userId: 1, completionTimeHour: 1, completionTimeMinutes: -1 },
      { id: 1, userId: 1, completionTimeHour: 100, completionTimeMinutes: 1 },
      { id: 1, userId: 1, completionTimeHour: 1, completionTimeMinutes: 60 },
      { id: 1, userId: 1, completionTimeHour: 1, completionTimeMinutes: null },
      { id: 1, userId: 1, completionTimeHour: null, completionTimeMinutes: 1 },
      { id: 1, userId: 1, completionTimeHour: NaN, completionTimeMinutes: 1 },
      { id: 1, userId: 1, completionTimeHour: 1, completionTimeMinutes: NaN },
    ])(
      "throws a ZodError if the update request was %p",
      async (updateRequest) => {
        await expect(
          challengeParticipantService.updateOne(
            updateRequest as ChallengeParticipantUpdateRequest
          )
        ).rejects.toThrowError(ZodError);
      }
    );
  });

  describe("getCompletedResultsForChallengeInOrder", () => {
    it.each([INVALID_NUMBER_CASES])(
      "throws a ZodError if the id provided is %p",
      async (challengeId) => {
        await expect(
          challengeParticipantService.getCompletedResultsForChallengeInOrder(
            challengeId as number
          )
        ).rejects.toThrowError(ZodError);
      }
    );
  });

  describe("getOneForUserAndChallenge", () => {
    it("returns the mapped entity if found", async () => {
      const userId = generateRandomNumber();
      const challengeId = generateRandomNumber();
      const expectedParticipantEntity =
        generateMockChallengeParticipantEntity();
      when(
        challengeParticipantRepository.findOne({ userId, challengeId })
      ).thenResolve(expectedParticipantEntity);
      const foundParticipant =
        await challengeParticipantService.getOneForUserOnChallenge(
          userId,
          challengeId
        );
      expect(foundParticipant.id).toEqual(expectedParticipantEntity.id);
      expect(foundParticipant.userId).toEqual(expectedParticipantEntity.userId);
      expect(foundParticipant.challengeId).toEqual(
        expectedParticipantEntity.challengeId
      );
      expect(foundParticipant.completionTimeHour).toEqual(
        expectedParticipantEntity.completionTimeHour
      );
      expect(foundParticipant.completionTimeMinutes).toEqual(
        expectedParticipantEntity.completionTimeMinutes
      );
    });

    it("throws an error if not found", async () => {
      const userId = generateRandomNumber();
      const challengeId = generateRandomNumber();
      when(
        challengeParticipantRepository.findOne({ userId, challengeId })
      ).thenResolve(undefined);
      await expect(
        challengeParticipantService.getOneForUserOnChallenge(
          userId,
          challengeId
        )
      ).rejects.toThrowError(NotFoundError);
    });

    it.each(INVALID_NUMBER_CASES)(
      "throws a ZodError if the userId provided is %p",
      async (userId) => {
        await expect(
          challengeParticipantService.getOneForUserOnChallenge(
            userId as number,
            1
          )
        ).rejects.toThrowError(ZodError);
      }
    );

    it.each(INVALID_NUMBER_CASES)(
      "throws a ZodError if the challengeId provided is %p",
      async (challengeId) => {
        await expect(
          challengeParticipantService.getOneForUserOnChallenge(
            1,
            challengeId as number
          )
        ).rejects.toThrowError(ZodError);
      }
    );
  });

  describe("getAllForChallengeId", () => {
    it.each([...INVALID_NUMBER_CASES])(
      "throws a ZodError if the challenge id provided is %p",
      async (challengeId) => {
        await expect(
          challengeParticipantService.getAllForChallengeId(
            challengeId as number
          )
        ).rejects.toThrowError(ZodError);
      }
    );

    it("returns the found challenge participants", async () => {
      const challengeId = generateRandomNumber();
      const expectedParticipants = [
        generateMockChallengeParticipantEntity(),
        generateMockChallengeParticipantEntity(),
      ];
      when(challengeParticipantRepository.find({ challengeId })).thenResolve(
        expectedParticipants
      );
      const foundParticipants =
        await challengeParticipantService.getAllForChallengeId(challengeId);
      expect(foundParticipants).toHaveLength(expectedParticipants.length);
      expect(foundParticipants[0].id).toEqual(expectedParticipants[0].id);
      expect(foundParticipants[1].id).toEqual(expectedParticipants[1].id);
    });
  });

  describe("removeOneForChallenge", () => {
    it("returns the mapped entity if found", async () => {
      const userId = generateRandomNumber();
      const challengeId = generateRandomNumber();
      const expectedParticipantEntity =
        generateMockChallengeParticipantEntity();
      when(
        challengeParticipantRepository.findOne({ userId, challengeId })
      ).thenResolve(expectedParticipantEntity);
      const foundParticipant =
        await challengeParticipantService.removeOneForChallenge(
          userId,
          challengeId
        );
      expect(foundParticipant.id).toEqual(expectedParticipantEntity.id);
      expect(foundParticipant.userId).toEqual(expectedParticipantEntity.userId);
      expect(foundParticipant.challengeId).toEqual(
        expectedParticipantEntity.challengeId
      );
      expect(foundParticipant.completionTimeHour).toEqual(
        expectedParticipantEntity.completionTimeHour
      );
      expect(foundParticipant.completionTimeMinutes).toEqual(
        expectedParticipantEntity.completionTimeMinutes
      );
    });

    it("throws an error if not found", async () => {
      const userId = generateRandomNumber();
      const challengeId = generateRandomNumber();
      when(
        challengeParticipantRepository.findOne({ userId, challengeId })
      ).thenResolve(undefined);
      await expect(
        challengeParticipantService.removeOneForChallenge(userId, challengeId)
      ).rejects.toThrowError(NotFoundError);
    });

    it.each(INVALID_NUMBER_CASES)(
      "throws a ZodError if the userId provided is %p",
      async (userId) => {
        await expect(
          challengeParticipantService.removeOneForChallenge(userId as number, 1)
        ).rejects.toThrowError(ZodError);
      }
    );

    it.each(INVALID_NUMBER_CASES)(
      "throws a ZodError if the challengeId provided is %p",
      async (challengeId) => {
        await expect(
          challengeParticipantService.removeOneForChallenge(
            1,
            challengeId as number
          )
        ).rejects.toThrowError(ZodError);
      }
    );
  });
});
