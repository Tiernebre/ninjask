import { SeasonService } from ".";
import { object, when } from "testdouble";
import { createSeasonEntity } from "./season.mock";
import { SeasonRepository } from "./season.repository";
import { generateRandomNumber } from "../random";

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

  describe("getAllForLeague", () => {
    it("returns all of the mapped seasons for the given league id", async () => {
      const leagueId = generateRandomNumber();
      const entities = [createSeasonEntity(), createSeasonEntity()];
      when(repository.findAllWithLeagueId(leagueId)).thenResolve(entities);
      const gottenSeasons = await service.getAllForLeague(leagueId);
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
