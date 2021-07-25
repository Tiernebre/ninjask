import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Challenge } from "../challenge/challenge";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { DraftSelectionEntity } from "../draft-selection/draft-selection.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ name: "challenge_participants" })
export class ChallengeParticipantEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ update: false })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => ChallengeEntity, (challenge) => challenge.participants, {
    onDelete: "CASCADE",
  })
  challenge!: Promise<Challenge>;

  @ManyToOne(() => UserEntity, (user) => user.challengeResults)
  user!: Promise<UserEntity>;

  @Column({ type: "integer", nullable: true })
  completionTimeHour!: number | null;

  @Column({ type: "integer", nullable: true })
  completionTimeMinutes!: number | null;

  @Column()
  challengeId!: number;

  @Column()
  userId!: number;

  @OneToMany(
    () => DraftSelectionEntity,
    (draftSelection) => draftSelection.challengeParticipant
  )
  draftSelections!: Promise<DraftSelectionEntity[]>;
}
