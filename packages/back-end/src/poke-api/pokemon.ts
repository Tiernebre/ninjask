import { NamedAPIResource } from ".";
import { APIResource, Description, Name } from "./utility";

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  front_gray?: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  back_gray?: string | null;
  other: { [name: string]: Partial<PokemonSprites> };
  versions: { [name: string]: { [name: string]: Partial<PokemonSprites> } };
}

interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

interface PokemonSpeciesDexEntry {
  entry_number: number;
  pokedex: NamedAPIResource;
}

interface PalParkEncounterArea {
  base_score: number;
  rate: number;
  area: NamedAPIResource;
}

interface Genus {
  genus: string;
  language: NamedAPIResource;
}

interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  sprites: PokemonSprites;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: PokemonType[];
}

export interface PokeApiPokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: PokemonSpeciesDexEntry[];
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource;
  evolution_chain: APIResource;
  habitat: NamedAPIResource;
  generation: NamedAPIResource;
  names: Name[];
  pal_park_encounters: PalParkEncounterArea[];
  form_descriptions: Description[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
}
