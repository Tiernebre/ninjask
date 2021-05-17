import { PokemonService } from "../pokemon/pokemon.service";
import { DraftService } from "./draft.service";
import { LiveDraftPool } from "./live-draft-pool";

export class LiveDraftPoolService {
  constructor(
    private readonly draftService: DraftService,
    private readonly pokemonService: PokemonService
  ) {}

  public async getLiveDraftPoolForOneWithId(
    id: number
  ): Promise<LiveDraftPool> {
    return this.getLiveDraftInformationForOneWithId(id);
  }

  public async revealNextPokemonInLivePoolForId(
    id: number
  ): Promise<LiveDraftPool> {
    await this.draftService.incrementPoolIndexForOneWithId(id);
    return this.getLiveDraftInformationForOneWithId(id);
  }

  private async getLiveDraftInformationForOneWithId(
    id: number
  ): Promise<LiveDraftPool> {
    const draft = await this.draftService.getOneAsEntityWithPool(id);
    const pokemon = await draft.pokemon;
    const currentPokemon = pokemon[draft.livePoolPokemonIndex];
    const mappedCurrentPokemon = currentPokemon
      ? await this.pokemonService.getOneById(currentPokemon.pokemonId)
      : null;

    const pooledPokemonIds = pokemon
      .slice(0, draft.livePoolPokemonIndex + 1)
      .map(({ pokemonId }) => pokemonId);
    const mapPooledPokemon = await Promise.all(
      pooledPokemonIds.map((pokemonId) =>
        this.pokemonService.getOneById(pokemonId)
      )
    );

    return {
      draftId: draft.id,
      currentPokemon: mappedCurrentPokemon,
      currentIndex: draft.livePoolPokemonIndex,
      pooledPokemon: mapPooledPokemon,
      isPoolOver: draft.livePoolPokemonIndex === draft.poolSize - 1,
    };
  }
}
