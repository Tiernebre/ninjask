import { EntityRepository, Repository } from "typeorm";
import { DraftSelectionRow } from "./draft-selection";
import { DraftSelectionEntity } from "./draft-selection.entity";

@EntityRepository(DraftSelectionEntity)
export class DraftSelectionRepository extends Repository<DraftSelectionEntity> {
  public async getAllForDraftId(draftId: number): Promise<DraftSelectionRow[]> {
    return this.createQueryBuilder("draftSelection")
      .leftJoin("draftSelection.pokemon", "pokemon")
      .innerJoin("draftSelection.challengeParticipant", "challengeParticipant")
      .innerJoin("challengeParticipant.user", "user")
      .innerJoin("challengeParticipant.challenge", "challenge")
      .innerJoin("challenge.draft", "draft")
      .select("draftSelection.id", "id")
      .addSelect("draftSelection.roundNumber", "round")
      .addSelect("draftSelection.pickNumber", "pick")
      .addSelect("user.nickname", "userNickname")
      .addSelect("pokemon.pokemonId", "pokemonId")
      .where("draft.id = :draftId", { draftId })
      .getRawMany<DraftSelectionRow>();
  }
}
