import { generateMockPokeApiPokemon } from "../poke-api";
import { mapFromPokeApi } from "./pokemon.mapper";

describe("pokemon.mapper", () => {
  describe("mapFromPokeApi", () => {
    it("returns a properly formatted pokemon from its PokeAPI version", () => {
      const pokeApiPokemon = generateMockPokeApiPokemon();
      pokeApiPokemon.id = 1;
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.id).toEqual(pokeApiPokemon.id);
      expect(pokemonCreated.name).toEqual(pokeApiPokemon.name);
      expect(pokemonCreated.imageUrl).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/001.png"
      );
    });

    it("returns a properly formatted image URL for a pokemon with an id in the double digits", () => {
      const pokeApiPokemon = generateMockPokeApiPokemon();
      pokeApiPokemon.id = 15;
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.imageUrl).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/015.png"
      );
    });

    it("returns a properly formatted image URL for a pokemon with an id in the triple digits", () => {
      const pokeApiPokemon = generateMockPokeApiPokemon();
      pokeApiPokemon.id = 354;
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.imageUrl).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/354.png"
      );
    });
  });
});
