import { generateMockPokeApiPokemonSpecies } from "../poke-api";
import { mapFromPokeApi } from "./pokemon.mapper";

describe("pokemon.mapper", () => {
  describe("mapFromPokeApi", () => {
    it("returns a properly formatted pokemon from its PokeAPI version", () => {
      const pokeApiPokemon = generateMockPokeApiPokemonSpecies();
      pokeApiPokemon.id = 1;
      pokeApiPokemon.name = "pikachu";
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.id).toEqual(pokeApiPokemon.id);
      expect(pokemonCreated.name).toEqual(pokeApiPokemon.name);
      expect(pokemonCreated.imageUrl).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/001.png"
      );
      expect(pokemonCreated.iconUrl).toEqual(
        "https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/regular/pikachu.png"
      );
    });

    it("returns a properly formatted image URL for a pokemon with an id in the double digits", () => {
      const pokeApiPokemon = generateMockPokeApiPokemonSpecies();
      pokeApiPokemon.id = 15;
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.imageUrl).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/015.png"
      );
    });

    it("returns a properly formatted image URL for a pokemon with an id in the triple digits", () => {
      const pokeApiPokemon = generateMockPokeApiPokemonSpecies();
      pokeApiPokemon.id = 354;
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.imageUrl).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/354.png"
      );
    });
  });
});
