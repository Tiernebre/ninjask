import { Name, NamedAPIResource, Description } from "./utility";

export interface PokeApiVersion {
  id: number;
  name: string;
  names: Name[];
  version_group: NamedAPIResource;
}

export interface PokeApiVersionGroup {
  id: number;
  name: string;
  order: number;
  generation: NamedAPIResource;
  move_learn_methods: NamedAPIResource[];
  pokedexes: NamedAPIResource[];
  regions: NamedAPIResource[];
  versions: NamedAPIResource[];
}

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: NamedAPIResource;
}

export interface PokeApiPokedex {
  id: number;
  name: string;
  is_main_series: boolean;
  descriptions: Description[];
  names: Name[];
  pokemon_entries: PokemonEntry[];
  region: NamedAPIResource;
  version_groups: NamedAPIResource[];
}
