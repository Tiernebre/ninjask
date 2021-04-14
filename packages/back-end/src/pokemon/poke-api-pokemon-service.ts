import { Pokemon } from "./pokemon";
import { PokemonService } from "./pokemon-service";

export class PokeApiPokemonService implements PokemonService {
  getOne(id: number): Promise<Pokemon> {
    throw new Error("Method not implemented.");
  }
}