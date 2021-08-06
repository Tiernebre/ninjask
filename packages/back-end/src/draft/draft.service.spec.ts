import { matchers, object, when, verify } from "testdouble";
import { Repository } from "typeorm";
import { DraftEntity } from "./draft.entity";
import {
  generateMockDraftEntity,
  generateMockDraftPokemonEntity,
} from "./draft.mock";
import { DraftService } from "./draft.service";
import { generateRandomNumber } from "../random";
import { Logger } from "../logger";
import { NotFoundError } from "../error";

describe("DraftService", () => {
  let draftService: DraftService;
  let draftRepository: Repository<DraftEntity>;

  beforeEach(() => {
    draftRepository = object<Repository<DraftEntity>>();
    draftService = new DraftService(draftRepository, object<Logger>());
  });

  describe("getOne", () => {
    it("returns the found draft if it exists", async () => {
      const id = generateRandomNumber();
      const expected = generateMockDraftEntity();
      when(draftRepository.findOne(id)).thenResolve(expected);
      await expect(draftService.getOne(id)).resolves.toEqual({
        id: expected.id,
        poolSize: (await expected.pokemon).length,
        extraPoolSize: expected.extraPoolSize,
        livePoolingHasFinished: false,
        challengeId: expected.challengeId,
        numberOfRounds: expected.numberOfRounds,
      });
    });

    it("returns with live pooling still needing to be finished if no pokemon exist", async () => {
      const id = generateRandomNumber();
      const expected = generateMockDraftEntity();
      expected.pokemon = Promise.resolve([]);
      when(draftRepository.findOne(id)).thenResolve(expected);
      const { livePoolingHasFinished } = await draftService.getOne(id);
      expect(livePoolingHasFinished).toEqual(false);
    });

    it("returns with live pooling not being finished if pokemon exist but the live pool index is still far below the amount", async () => {
      const id = generateRandomNumber();
      const expected = generateMockDraftEntity();
      const expectedPokemon = [
        generateMockDraftPokemonEntity(),
        generateMockDraftPokemonEntity(),
      ];
      expected.pokemon = Promise.resolve(expectedPokemon);
      expected.livePoolPokemonIndex = 0;
      when(draftRepository.findOne(id)).thenResolve(expected);
      const { livePoolingHasFinished } = await draftService.getOne(id);
      expect(livePoolingHasFinished).toEqual(false);
    });

    it("returns with live pooling still as finished if pokemon exist and the live pool index is right below the amount", async () => {
      const id = generateRandomNumber();
      const expected = generateMockDraftEntity();
      const expectedPokemon = [
        generateMockDraftPokemonEntity(),
        generateMockDraftPokemonEntity(),
      ];
      expected.pokemon = Promise.resolve(expectedPokemon);
      expected.livePoolPokemonIndex = expectedPokemon.length - 1;
      when(draftRepository.findOne(id)).thenResolve(expected);
      const { livePoolingHasFinished } = await draftService.getOne(id);
      expect(livePoolingHasFinished).toEqual(true);
    });

    it("throws a NotFoundError if it could not be found with the given id", async () => {
      const id = generateRandomNumber();
      when(draftRepository.findOne(id)).thenResolve(undefined);
      await expect(draftService.getOne(id)).rejects.toThrowError(NotFoundError);
    });
  });

  describe("getOneAsEntityWithPool", () => {
    it("returns the found draft entity if it exists", async () => {
      const id = generateRandomNumber();
      const expected = generateMockDraftEntity();
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(
        expected
      );
      const gotten = await draftService.getOneAsEntityWithPool(id);
      expect(gotten).toEqual(expected);
    });

    it("throws an error if the draft entity does not exist", async () => {
      const id = 1;
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(
        undefined
      );
      await expect(
        draftService.getOneAsEntityWithPool(id)
      ).rejects.toThrowError(`Draft with id ${id} was not found.`);
    });
  });

  describe("getOneForChallengeId", () => {
    it("throws a NotFoundError if one was not found with given challenge id", async () => {
      const challengeId = generateRandomNumber();
      when(draftRepository.findOne({ challengeId })).thenResolve(undefined);
      await expect(
        draftService.getOneForChallengeId(challengeId)
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe("incrementPoolIndexForOneWithId", () => {
    it("gets called correctly", async () => {
      const id = generateRandomNumber();
      await expect(
        draftService.incrementPoolIndexForOneWithId(id)
      ).resolves.not.toThrowError();
      verify(draftRepository.increment({ id }, "livePoolPokemonIndex", 1));
    });
  });
});
