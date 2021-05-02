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
      expect(pokemonCreated.imageUrls.image).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/001.png"
      );
      expect(pokemonCreated.imageUrls.thumbnail).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/001.png"
      );
      expect(pokemonCreated.imageUrls.icon).toEqual(
        "https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/regular/pikachu.png"
      );
    });

    it("returns a properly formatted image URL for a pokemon with an id in the double digits", () => {
      const pokeApiPokemon = generateMockPokeApiPokemonSpecies();
      pokeApiPokemon.id = 15;
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.imageUrls.image).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/015.png"
      );
      expect(pokemonCreated.imageUrls.thumbnail).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/015.png"
      );
    });

    it("returns a properly formatted image URL for a pokemon with an id in the triple digits", () => {
      const pokeApiPokemon = generateMockPokeApiPokemonSpecies();
      pokeApiPokemon.id = 354;
      const pokemonCreated = mapFromPokeApi(pokeApiPokemon);
      expect(pokemonCreated.imageUrls.image).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/354.png"
      );
      expect(pokemonCreated.imageUrls.thumbnail).toEqual(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/354.png"
      );
    });
  });
});
