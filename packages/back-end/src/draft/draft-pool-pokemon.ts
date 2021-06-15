import { Pokemon } from "../pokemon";

export interface DraftPoolPokemon extends Pokemon {
  draftPoolId: number;
}