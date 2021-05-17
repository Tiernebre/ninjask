import { matchers, object, when } from "testdouble";
import { Repository } from "typeorm";
import { DraftEntity } from "./draft.entity";
import { generateMockDraftEntity } from "./draft.mock";
import { DraftService } from "./draft.service";
import { generateRandomNumber } from "../random";
import { Logger } from "../logger";

describe("DraftService", () => {
  let draftService: DraftService;
  let draftRepository: Repository<DraftEntity>;

  beforeEach(() => {
    draftRepository = object<Repository<DraftEntity>>();
    draftService = new DraftService(draftRepository, object<Logger>());
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
