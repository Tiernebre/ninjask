import { matchers, object, when } from "testdouble";
import { Repository } from "typeorm";
import { DraftEntity } from "./draft.entity";
import { generateMockDraftEntity } from "./draft.mock";
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
      });
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
});
