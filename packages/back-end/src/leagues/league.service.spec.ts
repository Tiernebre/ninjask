import { Repository } from "typeorm";
import { LeagueEntity } from "./league.entity";
import { LeagueService } from "./league.service";
import { object, when } from "testdouble";
import { Logger } from "../logger";
import {
  generateMockCreateLeagueRequest,
  generateMockLeagueEntity,
} from "./league.mock";
import { CreateLeagueRequest } from "./create-league-request";
import { ZodError } from "zod";
import { INVALID_NUMBER_CASES } from "../test/cases";
import { generateRandomNumber } from "../random";

describe("LeagueService", () => {
  let leagueService: LeagueService;
  let leagueRepository: Repository<LeagueEntity>;

  beforeEach(() => {
    leagueRepository = object<Repository<LeagueEntity>>();
    leagueService = new LeagueService(leagueRepository, object<Logger>());
  });

  describe("getAll", () => {
    it("returns all of the leagues", async () => {
      const entities = [generateMockLeagueEntity(), generateMockLeagueEntity()];
      when(leagueRepository.find()).thenResolve(entities);
      const gottenLeagues = await leagueService.getAll();
      const [firstEntity, secondEntity] = entities;
      const [firstLeague, secondLeague] = gottenLeagues;
      expect(firstLeague).toEqual({
        id: firstEntity.id,
        name: firstEntity.name,
        description: firstEntity.description,
        creatorId: firstEntity.creatorId,
      });
      expect(secondLeague).toEqual({
        id: secondEntity.id,
        name: secondEntity.name,
        description: secondEntity.description,
        creatorId: secondEntity.creatorId,
      });
    });
  });

  describe("createOne", () => {
    const validCreateLeagueRequest = generateMockCreateLeagueRequest();

    const setupValidationCase = (request: unknown): CreateLeagueRequest => {
      return {
        ...validCreateLeagueRequest,
        ...(request as CreateLeagueRequest),
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
      setupValidationCase({ description: "a".repeat(129) }),
      // strict mode cases
      setupValidationCase({ creatorId: 100 }),
      setupValidationCase({ someUnknownProperty: "foo" }),
    ])("throws a ZodError if given request %p", async (request: unknown) => {
      await expect(
        leagueService.createOne(request as CreateLeagueRequest, 1)
      ).rejects.toThrowError(ZodError);
    });

    it.each(INVALID_NUMBER_CASES)(
      "throws a ZodError if given creator id = %p",
      async (creatorId: unknown) => {
        await expect(
          leagueService.createOne(validCreateLeagueRequest, creatorId as number)
        ).rejects.toThrowError(ZodError);
      }
    );

    it("returns the created league", async () => {
      const creatorId = generateRandomNumber();
      const expectedEntity = generateMockLeagueEntity();
      when(
        leagueRepository.create({
          ...validCreateLeagueRequest,
          creatorId,
        })
      ).thenReturn(expectedEntity);
      when(leagueRepository.save(expectedEntity)).thenResolve(expectedEntity);
      const createdLeague = await leagueService.createOne(
        validCreateLeagueRequest,
        creatorId
      );
      expect(expectedEntity).toEqual(expect.objectContaining(createdLeague));
    });
  });

  describe("getOneById", () => {
    it("returns the found league", async () => {
      const id = generateRandomNumber();
      const expectedEntity = generateMockLeagueEntity();
      when(leagueRepository.findOne(id)).thenResolve(expectedEntity);
      const foundLeague = await leagueService.getOneById(id);
      expect(expectedEntity).toEqual(expect.objectContaining(foundLeague));
    });
  });
});
