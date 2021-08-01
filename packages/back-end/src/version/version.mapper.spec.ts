import {
  generateMockPokeApiPokedex,
  generateMockPokeApiVersion,
  generateMockPokeApiVersionGroup,
} from "../poke-api/games.mock";
import {
  mapPokedexFromPokeApi,
  mapVersionFromEntity,
  mapVersionFromPokeApi,
  mapVersionGroupFromPokeApi,
} from "./version.mapper";
import { generateMockVersionEntity } from "./version.mock";

describe("version.mapper", () => {
  describe("mapPokedexFromPokeApi", () => {
    it("returns a properly mapped Pokedex DTO", () => {
      const pokeApiPokedex = generateMockPokeApiPokedex();
      const mappedPokedex = mapPokedexFromPokeApi(pokeApiPokedex);
      expect(mappedPokedex.id).toEqual(pokeApiPokedex.id);
      expect(mappedPokedex.pokemonUrls).toEqual(
        pokeApiPokedex.pokemon_entries.map(
          (pokemonEntry) => pokemonEntry.pokemon_species.url
        )
      );
    });
  });

  describe("mapVersionGroupFromPokeApi", () => {
    it("returns a properly formatted version group DTO", () => {
      const pokeApiVersionGroup = generateMockPokeApiVersionGroup();
      const mappedVersionGroup =
        mapVersionGroupFromPokeApi(pokeApiVersionGroup);
      expect(mappedVersionGroup.id).toEqual(pokeApiVersionGroup.id);
      expect(mappedVersionGroup.pokedexUrl).toEqual(
        pokeApiVersionGroup.pokedexes[0].url
      );
    });
  });

  describe("mapVersionFromPokeApi", () => {
    it("returns a properly formatted version DTO", () => {
      const pokeApiVersion = generateMockPokeApiVersion();
      const mappedVersion = mapVersionFromPokeApi(pokeApiVersion);
      expect(mappedVersion.id).toEqual(pokeApiVersion.id);
      expect(mappedVersion.name).toEqual(pokeApiVersion.name);
      expect(mappedVersion.versionGroupUrl).toEqual(
        pokeApiVersion.version_group.url
      );
      expect(mappedVersion.deniedPokemonIds).toEqual(new Set());
    });

    it("allows for included mapping of denied pokemon", () => {
      const deniedPokemonIds = [1, 4, 10];
      const pokeApiVersion = generateMockPokeApiVersion();
      const mappedVersion = mapVersionFromPokeApi(
        pokeApiVersion,
        deniedPokemonIds
      );
      expect(mappedVersion.deniedPokemonIds).toEqual(new Set(deniedPokemonIds));
    });
  });

  describe("mapVersionFromEntity", () => {
    it("returns a properly formatted version DTO", () => {
      const entity = generateMockVersionEntity();
      const mappedVersion = mapVersionFromEntity(entity);
      expect(mappedVersion.id).toEqual(entity.id);
      expect(mappedVersion.name).toEqual(entity.name);
      expect(mappedVersion.versionGroupUrl).toEqual(entity.versionGroupUrl);
    });
  });
});
