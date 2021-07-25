import { object, when, verify } from "testdouble";
import { Repository } from "typeorm";
import { z, ZodError } from "zod";
import { ForbiddenError } from "../error";
import { NotFoundError } from "../error/not-found-error";
import { INVALID_NUMBER_CASES } from "../test/cases";
import { ChallengeStatus } from "./challenge-status";
import { ChallengeEntity } from "./challenge.entity";
import { generateMockChallenge } from "./challenge.mock";
import { ChallengeService } from "./challenge.service";
import { CreateChallengeRequest } from "./create-challenge-request";

describe("ChallengeService", () => {
  let challengeRepository: Repository<ChallengeEntity>;
  let challengeService: ChallengeService;

  beforeEach(() => {
    challengeRepository = object<Repository<ChallengeEntity>>();
    challengeService = new ChallengeService(challengeRepository);
  });

  describe("getOneById", () => {
    it("returns the challenge if it exists", async () => {
      const challenge = generateMockChallenge();
      when(challengeRepository.findOne(challenge.id)).thenResolve(challenge);
      const gottenChallenge = await challengeService.getOneById(challenge.id);
      expect(gottenChallenge.id).toEqual(challenge.id);
      expect(gottenChallenge.name).toEqual(challenge.name);
      expect(gottenChallenge.description).toEqual(challenge.description);
      expect(gottenChallenge.versionId).toEqual(challenge.versionId);
      expect(gottenChallenge.creatorId).toEqual(challenge.creatorId);
    });

    it("throws an error if the challenge does not exist", async () => {
      const id = 1;
      when(challengeRepository.findOne(id)).thenResolve(undefined);
      await expect(challengeService.getOneById(id)).rejects.toThrowError(
        NotFoundError
      );
    });

    it.each(INVALID_NUMBER_CASES)(
      "throws a Zod error if the id provided is %p",
      async (id: unknown) => {
        await expect(
          challengeService.getOneById(id as number)
        ).rejects.toThrowError(z.ZodError);
      }
    );
  });

  describe("getAllForUserWithId", () => {
    it.each(INVALID_NUMBER_CASES)(
      "throws a Zod error if the id provided is %p",
      async (id: unknown) => {
        await expect(
          challengeService.getAllForUserWithId(id as number)
        ).rejects.toThrowError(z.ZodError);
      }
    );
  });

  describe("oneCanHavePoolGeneratedWithId", () => {
    it.each([ChallengeStatus.CREATED, ChallengeStatus.POOLED])(
      "returns true if the challenge has status = %p",
      async (status: ChallengeStatus) => {
        const challenge = generateMockChallenge();
        challenge.status = status;
        when(challengeRepository.findOne(challenge.id)).thenResolve(challenge);
        await expect(
          challengeService.oneCanHavePoolGeneratedWithId(challenge.id)
        ).resolves.toEqual(true);
      }
    );

    it.each([ChallengeStatus.DRAFTED, ChallengeStatus.COMPLETED])(
      "returns false if the challenge has status = %p",
      async (status: ChallengeStatus) => {
        const challenge = generateMockChallenge();
        challenge.status = status;
        when(challengeRepository.findOne(challenge.id)).thenResolve(challenge);
        await expect(
          challengeService.oneCanHavePoolGeneratedWithId(challenge.id)
        ).resolves.toEqual(false);
      }
    );
  });

  describe("deleteOneById", () => {
    it("throws an error if the challenge does not exist", async () => {
      const id = 1;
      when(challengeRepository.findOne(id)).thenResolve(undefined);
      await expect(challengeService.deleteOneById(id, 1)).rejects.toThrowError(
        NotFoundError
      );
    });

    it("throws a ForbiddenError if the challenge does not exist", async () => {
      const challenge = generateMockChallenge();
      when(challengeRepository.findOne(challenge.id)).thenResolve(challenge);
      await expect(
        challengeService.deleteOneById(challenge.id, challenge.creatorId + 1)
      ).rejects.toThrowError(ForbiddenError);
    });

    it("deletes the challenge", async () => {
      const challenge = generateMockChallenge();
      when(challengeRepository.findOne(challenge.id)).thenResolve(challenge);
      await expect(
        challengeService.deleteOneById(challenge.id, challenge.creatorId)
      ).resolves.toBeUndefined();
      verify(challengeRepository.delete({ id: challenge.id }));
    });

    it.each(INVALID_NUMBER_CASES)(
      "throws a Zod error if the id provided is %p",
      async (id: unknown) => {
        await expect(
          challengeService.deleteOneById(id as number, 1)
        ).rejects.toThrowError(z.ZodError);
      }
    );
  });

  describe("getAll", () => {
    it("returns the mapped challenges", async () => {
      const challenges = [generateMockChallenge(), generateMockChallenge()];
      when(challengeRepository.find()).thenResolve(challenges);
      const gottenChallenges = await challengeService.getAll();
      gottenChallenges.forEach((gottenChallenge, index) => {
        const challenge = challenges[index];
        expect(gottenChallenge.id).toEqual(challenge.id);
        expect(gottenChallenge.name).toEqual(challenge.name);
        expect(gottenChallenge.description).toEqual(challenge.description);
        expect(gottenChallenge.versionId).toEqual(challenge.versionId);
        expect(gottenChallenge.creatorId).toEqual(challenge.creatorId);
      });
    });
  });

  describe("createOne", () => {
    const validCreateChallengeRequest = {
      name: "Challenge",
      description: "Description",
      versionId: 1,
      seasonId: 1,
    };

    const setupValidationCase = (request: unknown): CreateChallengeRequest => {
      return {
        ...validCreateChallengeRequest,
        ...(request as CreateChallengeRequest),
      };
    };

    it.each([
      // empty object case
      {},
      // name cases
      setupValidationCase({ name: "" }),
      setupValidationCase({ name: null }),
      setupValidationCase({ name: undefined }),
      setupValidationCase({ name: "a".repeat(33) }),
      /// description cases
      setupValidationCase({ description: null }),
      setupValidationCase({ description: undefined }),
      setupValidationCase({ description: "a".repeat(129) }),
      // version id cases
      setupValidationCase({ versionId: null }),
      setupValidationCase({ versionId: undefined }),
      setupValidationCase({ versionId: 35 }),
      // season id cases
      setupValidationCase({ versionId: null }),
      setupValidationCase({ versionId: undefined }),
      // strict mode cases
      setupValidationCase({ creatorId: 100 }),
      setupValidationCase({ someUnknownProperty: "foo" }),
    ])("throws a ZodError if given request %p", async (request: unknown) => {
      await expect(
        challengeService.createOne(request as CreateChallengeRequest, 1)
      ).rejects.toThrowError(ZodError);
    });
  });
});
