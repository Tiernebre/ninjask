import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant";

@Entity({
  name: 'draft_selection'
})
export class DraftSelectionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ChallengeParticipantEntity, (challengeParticipant) => challengeParticipant.draftSelections)
  challengeParticipant!: Promise<ChallengeParticipantEntity>;
}