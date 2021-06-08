import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { DraftPokemonEntity } from "../draft/draft-pokemon.entity";

@Entity({
  name: "draft_selection",
})
export class DraftSelectionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => ChallengeParticipantEntity,
    (challengeParticipant) => challengeParticipant.draftSelections
  )
  challengeParticipant!: Promise<ChallengeParticipantEntity>;

  @Column()
  roundNumber!: number;

  @Column()
  pickNumber!: number;

  @OneToOne(() => DraftPokemonEntity)
  @JoinColumn()
  pokemon!: Promise<DraftPokemonEntity>;
}
