import { Repository } from "typeorm";
import { DraftSelection, DraftSelectionRow } from "./draft-selection";
import { DraftSelectionEntity } from "./draft-selection.entity";
import { z } from "zod";
import { Pokemon, PokemonService } from "../pokemon";

export class DraftSelectionService {
  constructor(
    private readonly draftSelectionRepository: Repository<DraftSelectionEntity>,
    private readonly pokemonService: PokemonService
  ) {}

  public async getAllForDraft(draftId: number): Promise<DraftSelection[]> {
    z.number().parse(draftId);

    const foundSelections = await this.draftSelectionRepository
      .createQueryBuilder("draftSelection")
      .innerJoin("draftSelection.challengeParticipant", "challengeParticipant")
      .innerJoin("challengeParticipant.user", "user")
      .innerJoin("challengeParticipant.challenge", "challenge")
      .innerJoin("challenge.draft", "draft")
      .select("draftSelection.id", "id")
      .addSelect("draftSelection.roundNumber", "round")
      .addSelect("draftSelection.pickNumber", "pick")
      .addSelect("user.nickname", "userNickname")
      .where("draft.id = :draftId", { draftId })
      .getRawMany<DraftSelectionRow>();
    return Promise.all(foundSelections.map(async (foundSelection) => ({
      ...foundSelection,
      selection: await this.getPokemonForDraftSelection(foundSelection)
    })))
  }

  private async getPokemonForDraftSelection(draftSelection: DraftSelectionRow): Promise<Pokemon | null> {
    return draftSelection.pokemonId ? await this.pokemonService.getOneById(draftSelection.pokemonId) : null
  }
}
