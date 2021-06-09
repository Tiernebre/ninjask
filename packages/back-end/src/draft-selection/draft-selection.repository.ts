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
      .select("draftSelection.id", "id")
      .addSelect("draftSelection.roundNumber", "round")
      .addSelect("draftSelection.pickNumber", "pick")
      .addSelect("user.id", "userId")
      .addSelect("user.nickname", "userNickname")
      .addSelect("pokemon.pokemonId", "pokemonId")
      .where("draftSelection.draftId = :draftId", { draftId })
      .orderBy({
        "draftSelection.roundNumber": "ASC",
        "draftSelection.pickNumber": "ASC",
      })
      .getRawMany<DraftSelectionRow>();
  }

  public async getOneWithIdAndUserId(
    id: number,
    userId: number
  ): Promise<DraftSelectionEntity | undefined> {
    return this.createQueryBuilder("draftSelection")
      .innerJoin("draftSelection.challengeParticipant", "challengeParticipant")
      .innerJoin("challengeParticipant.user", "user")
      .where("draftSelection.id = :id", { id })
      .andWhere("user.id = :userId", { userId })
      .getOne();
  }

  public async getPendingSelectionsBeforeSelection(
    selection: DraftSelectionEntity,
    draftId: number
  ): Promise<DraftSelectionEntity[]> {
    const { roundNumber, pickNumber } = selection;
    return this.createQueryBuilder("draftSelection")
      .where("draftSelection.draftId = :draftId", { draftId })
      .andWhere("draftSelection.roundNumber <= :roundNumber", { roundNumber })
      .andWhere("draftSelection.pickNumber < :pickNumber", { pickNumber })
      .andWhere("draftSelection.pokemonId is null")
      .getMany();
  }
}
