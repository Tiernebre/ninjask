import { SeasonService } from ".";
import { object, when } from "testdouble";
import { createSeasonEntity } from "./season.mock";
import { SeasonRepository } from "./season.repository";

describe("SeasonService", () => {
  let repository: SeasonRepository;
  let service: SeasonService;

  beforeEach(() => {
    repository = object<SeasonRepository>();
    service = new SeasonService(repository);
  });

  describe("getAll", () => {
    it("returns all of the mapped seasons", async () => {
      const entities = [createSeasonEntity(), createSeasonEntity()];
      when(repository.find()).thenResolve(entities);
      const gottenSeasons = await service.getAll();
      gottenSeasons.forEach((gottenSeason, i) => {
        const correspondingEntity = entities[i];
        expect(gottenSeason.id).toEqual(correspondingEntity.id);
        expect(gottenSeason.name).toEqual(correspondingEntity.name);
        expect(gottenSeason.description).toEqual(
          correspondingEntity.description
        );
      });
    });
  });
});
