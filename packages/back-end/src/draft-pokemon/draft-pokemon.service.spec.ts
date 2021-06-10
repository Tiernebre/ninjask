import { object, when } from "testdouble";
import { Repository } from "typeorm";
import { DraftPokemonService } from ".";
import { DraftPokemonEntity } from "../draft/draft-pokemon.entity";
import { NotFoundError } from "../error";
import { generateMockDraftPokemon } from "./draft-pokemon.mock";

describe("DraftPokemonService", () => {
  let draftPokemonService: DraftPokemonService;
  let draftPokemonRepository: Repository<DraftPokemonEntity>;

  beforeEach(() => {
    draftPokemonRepository = object<Repository<DraftPokemonEntity>>();
    draftPokemonService = new DraftPokemonService(draftPokemonRepository);
  });

  describe("getOneById", () => {
    it("throws a NotFoundError if one does not exist with the provided id", async () => {
      const id = 1;
      when(draftPokemonRepository.findOne({ id })).thenResolve(undefined);
      await expect(draftPokemonService.getOneById(id)).rejects.toThrowError(
        NotFoundError
      );
    });

    it("returns a properly mapped version of the found draft pokemon", async () => {
      const id = 1;
      const draftPokemon = generateMockDraftPokemon();
      when(draftPokemonRepository.findOne({ id })).thenResolve(draftPokemon);
      const gottenPokemon = await draftPokemonService.getOneById(id);
      expect(gottenPokemon.id).toEqual(draftPokemon.id);
      expect(gottenPokemon.pokemonId).toEqual(draftPokemon.pokemonId);
      expect(gottenPokemon.draftId).toEqual(draftPokemon.draftId);
    });
  });
});
