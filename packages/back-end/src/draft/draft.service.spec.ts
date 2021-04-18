jest.mock("../http", () => ({
  fetchOk: jest.fn(),
}));

import { matchers, object, verify, when } from "testdouble";
import { Repository } from "typeorm";
import { PokemonService } from "../pokemon/pokemon.service";
import { VersionService } from "../version/version.service";
import { DraftEntity } from "./draft.entity";
import { generateMockDraftEntity } from "./draft.mock";
import { DraftService } from "./draft.service";
import { fetchOk } from "../http";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import {
  generateMockPokeApiPokemonSpecies,
  PokeApiPokemonSpecies,
} from "../poke-api";
import { generateMockPokemon } from "../pokemon/pokemon.mock";
import { generateRandomNumber } from "../random";
import { Pokemon } from "../pokemon/pokemon";
import { generateMockPokedex } from "../version/version.mock";

const mockedFetchOk = (fetchOk as unknown) as jest.Mock;

describe("DraftService", () => {
  let draftService: DraftService;
  let draftRepository: Repository<DraftEntity>;
  let versionService: VersionService;
  let pokemonService: PokemonService;

  beforeEach(() => {
    draftRepository = object<Repository<DraftEntity>>();
    versionService = object<VersionService>();
    pokemonService = object<PokemonService>();
    draftService = new DraftService(
      draftRepository,
      versionService,
      pokemonService
    );
  });

  describe("getOneById", () => {
    it("returns the found draft entity if it exists", async () => {
      const id = generateRandomNumber();
      const expected = generateMockDraftEntity();
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(
        expected
      );
      const gotten = await draftService.getOneById(id);
      expect(gotten).toEqual(expected);
    });

    it("throws an error if the draft entity does not exist", async () => {
      const id = 1;
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(
        undefined
      );
      await expect(draftService.getOneById(id)).rejects.toThrowError(
        `Draft with id ${id} was not found.`
      );
    });
  });

  describe("generatePoolOfPokemonForOneWithId", () => {
    it("generates a pool of pokemon for a given draft id", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      const challenge = await draft.challenge;
      const pokedex = generateMockPokedex();
      draft.poolSize = pokedex.pokemonUrls.length;
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(draft);
      when(
        versionService.getPokedexFromOneWithId(challenge.versionId)
      ).thenResolve(pokedex);
      const pokemonGenerated: PokeApiPokemonSpecies[] = [];
      mockedFetchOk.mockImplementation(() => {
        const pokemon = generateMockPokeApiPokemonSpecies();
        pokemonGenerated.push(pokemon);
        return pokemon;
      });
      const expectedPokemonSaved = pokemonGenerated.map((pokemon) => {
        const pokemonDraftEntity = new DraftPokemonEntity();
        pokemonDraftEntity.pokemonId = pokemon.id;
        pokemonDraftEntity.draft = draft;
        return pokemonDraftEntity;
      });
      await draftService.generatePoolOfPokemonForOneWithId(id);
      draft.pokemon = expectedPokemonSaved;
      verify(draftRepository.save(draft));
    });
  });

  describe("getPoolOfPokemonForOneWithId", () => {
    it("returns the pokemon associated with a given draft pool", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      const expected: Pokemon[] = [];
      draft.pokemon.forEach((pokemon) => {
        const expectedPokemon = generateMockPokemon();
        expected.push(expectedPokemon);
        when(pokemonService.getOneById(pokemon.pokemonId)).thenResolve(
          expectedPokemon
        );
      });
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(draft);
      const gotten = await draftService.getPoolOfPokemonForOneWithId(id);
      expect(gotten).toEqual(expected);
    });

    it("returns an empty array if the draft has no pokemon tied to it", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      draft.pokemon = [];
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(draft);
      const gotten = await draftService.getPoolOfPokemonForOneWithId(id);
      expect(gotten).toEqual([]);
    });
  });
});
