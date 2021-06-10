import { Repository } from "typeorm";
import { DraftPokemon } from ".";
import { DraftPokemonEntity } from "../draft/draft-pokemon.entity";
import { NotFoundError } from "../error";

export class DraftPokemonService {
  constructor(
    private readonly draftPokemonRepository: Repository<DraftPokemonEntity>
  ) {}

  public async getOneById(id: number): Promise<DraftPokemon> {
    const foundDraftPokemon = await this.draftPokemonRepository.findOne({ id });
    if (!foundDraftPokemon) {
      throw new NotFoundError(`Draft pokemon with id = ${id} not found`);
    }
    return {
      id: foundDraftPokemon.id,
      pokemonId: foundDraftPokemon.pokemonId,
      draftId: foundDraftPokemon.draftId,
    };
  }
}
