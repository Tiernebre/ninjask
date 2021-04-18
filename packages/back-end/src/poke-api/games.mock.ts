import { PokeApiPokedex, PokeApiVersion, PokeApiVersionGroup } from "./games";

export const generateMockPokeApiVersion = (): PokeApiVersion => ({
  id: 1,
  name: "red",
  names: [
    {
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/",
      },
      name: "赤",
    },
    {
      language: {
        name: "ko",
        url: "https://pokeapi.co/api/v2/language/3/",
      },
      name: "레드",
    },
    {
      language: {
        name: "fr",
        url: "https://pokeapi.co/api/v2/language/5/",
      },
      name: "Rouge",
    },
    {
      language: {
        name: "de",
        url: "https://pokeapi.co/api/v2/language/6/",
      },
      name: "Rot",
    },
    {
      language: {
        name: "es",
        url: "https://pokeapi.co/api/v2/language/7/",
      },
      name: "Rojo",
    },
    {
      language: {
        name: "it",
        url: "https://pokeapi.co/api/v2/language/8/",
      },
      name: "Rossa",
    },
    {
      language: {
        name: "en",
        url: "https://pokeapi.co/api/v2/language/9/",
      },
      name: "Red",
    },
  ],
  version_group: {
    name: "red-blue",
    url: "https://pokeapi.co/api/v2/version-group/1/",
  },
});

export const generateMockPokeApiVersionGroup = (): PokeApiVersionGroup => ({
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 1,
  move_learn_methods: [
    {
      name: "level-up",
      url: "https://pokeapi.co/api/v2/move-learn-method/1/",
    },
    {
      name: "machine",
      url: "https://pokeapi.co/api/v2/move-learn-method/4/",
    },
    {
      name: "stadium-surfing-pikachu",
      url: "https://pokeapi.co/api/v2/move-learn-method/5/",
    },
  ],
  name: "red-blue",
  order: 1,
  pokedexes: [
    {
      name: "kanto",
      url: "https://pokeapi.co/api/v2/pokedex/2/",
    },
  ],
  regions: [
    {
      name: "kanto",
      url: "https://pokeapi.co/api/v2/region/1/",
    },
  ],
  versions: [
    {
      name: "red",
      url: "https://pokeapi.co/api/v2/version/1/",
    },
    {
      name: "blue",
      url: "https://pokeapi.co/api/v2/version/2/",
    },
  ],
});

export const generateMockPokeApiPokedex = (): PokeApiPokedex => ({
  descriptions: [
    {
      description: "Pokédex régional de Kanto dans Rouge/Bleu/Jaune",
      language: {
        name: "fr",
        url: "https://pokeapi.co/api/v2/language/5/",
      },
    },
    {
      description: "Rot/Blau/Gelb Kanto Dex",
      language: {
        name: "de",
        url: "https://pokeapi.co/api/v2/language/6/",
      },
    },
    {
      description: "Pokédex regional de Rojo/Azul/Amarillo",
      language: {
        name: "es",
        url: "https://pokeapi.co/api/v2/language/7/",
      },
    },
    {
      description: "Red/Blue/Yellow Kanto dex",
      language: {
        name: "en",
        url: "https://pokeapi.co/api/v2/language/9/",
      },
    },
  ],
  id: 2,
  is_main_series: true,
  name: "kanto",
  names: [
    {
      language: {
        name: "fr",
        url: "https://pokeapi.co/api/v2/language/5/",
      },
      name: "Kanto",
    },
    {
      language: {
        name: "de",
        url: "https://pokeapi.co/api/v2/language/6/",
      },
      name: "Kanto",
    },
    {
      language: {
        name: "es",
        url: "https://pokeapi.co/api/v2/language/7/",
      },
      name: "Kanto",
    },
    {
      language: {
        name: "en",
        url: "https://pokeapi.co/api/v2/language/9/",
      },
      name: "Kanto",
    },
  ],
  pokemon_entries: [
    {
      entry_number: 1,
      pokemon_species: {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/1/",
      },
    },
    {
      entry_number: 2,
      pokemon_species: {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/2/",
      },
    },
    {
      entry_number: 3,
      pokemon_species: {
        name: "venusaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/3/",
      },
    },
  ],
  region: {
    name: "kanto",
    url: "https://pokeapi.co/api/v2/region/1/",
  },
  version_groups: [
    {
      name: "red-blue",
      url: "https://pokeapi.co/api/v2/version-group/1/",
    },
    {
      name: "yellow",
      url: "https://pokeapi.co/api/v2/version-group/2/",
    },
    {
      name: "firered-leafgreen",
      url: "https://pokeapi.co/api/v2/version-group/7/",
    },
  ],
});
