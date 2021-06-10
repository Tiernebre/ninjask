import { Repository } from "typeorm";
import { DraftPokemonEntity } from "../draft/draft-pokemon.entity";
import { NotFoundError } from "../error";

export class DraftPokemonService {
  constructor(
    private readonly draftPokemonRepository: Repository<DraftPokemonEntity>
  ) {}

  public async getOneByid(id: number): Promise<DraftPokemonEntity> {
    const foundDraftPokemon = await this.draftPokemonRepository.findOne({ id }) 
    if (!foundDraftPokemon) {
      throw new NotFoundError(`Draft pokemon with id = ${id} not found`)
    }
    return foundDraftPokemon
  }
}