import { NamedAPIResource } from ".";;

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
