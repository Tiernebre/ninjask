jest.mock("../http", () => ({
  fetchOk: jest.fn(),
}));

import { DraftPoolService } from "./draft-pool.service";
import { generateMockPokemon } from "../pokemon/pokemon.mock";
import { DraftService } from "./draft.service";
import { matchers, object, verify, when } from "testdouble";
import { PokemonService } from "../pokemon/pokemon.service";
import { VersionService } from "../version/version.service";
import { Repository } from "typeorm";
import { DraftEntity } from "./draft.entity";
import { Logger } from "../logger";
import {
  PokeApiPokemonSpecies,
  generateMockPokeApiPokemonSpecies,
} from "../poke-api";
import { Pokemon } from "../pokemon/pokemon";
import { generateRandomNumber } from "../random";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import {
  generateMockDraftEntity,
  generateMockDraftPokemonEntity,
} from "./draft.mock";
import {
  generateMockPokedex,
  generateMockVersion,
} from "../version/version.mock";
import { fetchOk } from "../http";

const mockedFetchOk = fetchOk as unknown as jest.Mock;

describe("DraftPoolService", () => {
  let draftPoolService: DraftPoolService;
  let draftService: DraftService;
  let draftRepository: Repository<DraftEntity>;
  let pokemonService: PokemonService;
  let versionService: VersionService;

  beforeEach(() => {
    draftService = object<DraftService>();
    draftRepository = object<Repository<DraftEntity>>();
    pokemonService = object<PokemonService>();
    versionService = object<VersionService>();
    draftPoolService = new DraftPoolService(
      draftService,
      draftRepository,
      versionService,
      pokemonService,
      object<Logger>()
    );
  });

  describe("generateOneForDraftWithId", () => {
    it("generates a pool of pokemon for a given draft id", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      const challenge = await draft.challenge;
      const version = generateMockVersion();
      const pokedex = generateMockPokedex();
      draft.pokemon = Promise.resolve([]);
      when(draftService.getOneAsEntityWithPool(id)).thenResolve(draft);
      when(versionService.getOneById(challenge.versionId)).thenResolve(version);
      when(versionService.getPokedexFromOne(version)).thenResolve(pokedex);
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
      await draftPoolService.generateOneForDraftWithId(id);
      draft.pokemon = Promise.resolve(expectedPokemonSaved);
      verify(draftRepository.save(draft), { times: 1 });
    });

    it("clears an existing draft pool if a previous one existed during generation", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      const challenge = await draft.challenge;
      const version = generateMockVersion();
      const pokedex = generateMockPokedex();
      draft.pokemon = Promise.resolve([generateMockDraftPokemonEntity()]);
      when(draftService.getOneAsEntityWithPool(id)).thenResolve(draft);
      when(versionService.getOneById(challenge.versionId)).thenResolve(version);
      when(versionService.getPokedexFromOne(version)).thenResolve(pokedex);
      const pokemonGenerated: PokeApiPokemonSpecies[] = [];
      mockedFetchOk.mockImplementation(() => {
        const pokemon = generateMockPokeApiPokemonSpecies();
        pokemonGenerated.push(pokemon);
        return pokemon;
      });
      await draftPoolService.generateOneForDraftWithId(id);
      verify(draftRepository.save(matchers.anything()), { times: 2 });
    });
  });

  describe("getOneForDraftWithId", () => {
    it("returns the pokemon associated with a given draft pool", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      const expected: Pokemon[] = [];
      (await draft.pokemon).forEach((pokemon) => {
        const expectedPokemon = generateMockPokemon();
        expected.push(expectedPokemon);
        when(pokemonService.getOneById(pokemon.pokemonId)).thenResolve(
          expectedPokemon
        );
      });
      when(draftService.getOneAsEntityWithPool(id)).thenResolve(draft);
      const gotten = await draftPoolService.getOneForDraftWithId(id);
      expect(gotten).toEqual(expected);
    });

    it("returns an empty array if the draft has no pokemon tied to it", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      draft.pokemon = Promise.resolve([]);
      when(draftService.getOneAsEntityWithPool(id)).thenResolve(draft);
      const gotten = await draftPoolService.getOneForDraftWithId(id);
      expect(gotten).toEqual([]);
    });
  });
});
