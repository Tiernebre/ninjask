import { Repository } from "typeorm";
import { DraftSelection } from "./draft-selection";
import { DraftSelectionEntity } from "./draft-selection.entity";
import { z } from 'zod';

export class DraftSelectionService {
  constructor(
    private readonly draftSelectionRepository: Repository<DraftSelectionEntity>
  ) {}

  public async getAllForDraft(draftId: number): Promise<DraftSelection[]> {
    z.number().parse(draftId);
    return this.draftSelectionRepository
      .createQueryBuilder("draftSelection")
      .innerJoin("draftSelection.challengeParticipant", "challengeParticipant")
      .innerJoin("challengeParticipant.user", "user")
      .innerJoin("challengeParticipant.challenge", "challenge")
      .innerJoin("challenge.draft", "draft")
      .where("draft.id = :draftId", { draftId })
      .getRawMany<DraftSelection>();
  }
}