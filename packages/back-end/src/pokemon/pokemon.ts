import { PokemonImageUrls } from "./pokemon-image-urls";

export interface Pokemon {
  readonly id: number;
  readonly name: string;
  readonly imageUrls: PokemonImageUrls;
}