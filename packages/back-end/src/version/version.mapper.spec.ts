import {
  generateMockPokeApiPokedex,
  generateMockPokeApiVersionGroup,
} from "../poke-api/games.mock";
import { VersionDeniedPokemonEntity } from "./version-denied-pokemon.entity";
import {
  mapPokedexFromPokeApi,
  mapVersionFromEntity,
  mapVersionGroupFromPokeApi,
} from "./version.mapper";
import {
  generateMockVersionDeniedPokemon,
  generateMockVersionEntity,
} from "./version.mock";

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

  describe("mapVersionFromEntity", () => {
    it("returns a properly formatted version DTO", () => {
      const entity = generateMockVersionEntity();
      const mappedVersion = mapVersionFromEntity(entity);
      expect(mappedVersion.id).toEqual(entity.id);
      expect(mappedVersion.name).toEqual(entity.name);
      expect(mappedVersion.versionGroupUrl).toEqual(entity.versionGroupUrl);
    });

    it("returns a properly formatted version DTO with a denied pokemon ID list", () => {
      const entity = generateMockVersionEntity();
      entity.deniedPokemon = [
        generateMockVersionDeniedPokemon(),
        generateMockVersionDeniedPokemon(),
      ];
      const deniedPokemonIds = entity.deniedPokemon.map(
        ({ pokemonId }) => pokemonId
      );
      const mappedVersion = mapVersionFromEntity(entity);
      expect(mappedVersion.id).toEqual(entity.id);
      expect(mappedVersion.name).toEqual(entity.name);
      expect(mappedVersion.versionGroupUrl).toEqual(entity.versionGroupUrl);
      expect(mappedVersion.deniedPokemonIds).toEqual(new Set(deniedPokemonIds));
    });

    it("safely handles undefined pokemon denied list", () => {
      const entity = generateMockVersionEntity();
      entity.deniedPokemon =
        undefined as unknown as VersionDeniedPokemonEntity[];
      const mappedVersion = mapVersionFromEntity(entity);
      expect(mappedVersion.id).toEqual(entity.id);
      expect(mappedVersion.name).toEqual(entity.name);
      expect(mappedVersion.versionGroupUrl).toEqual(entity.versionGroupUrl);
      expect(mappedVersion.deniedPokemonIds).toEqual(new Set());
    });
  });
});
