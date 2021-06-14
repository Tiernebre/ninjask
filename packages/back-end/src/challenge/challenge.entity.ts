import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant/challenge-participant.entity";
import { DraftEntity } from "../draft/draft.entity";
import { SeasonEntity } from "../season/season.entity";
import { UserEntity } from "../user/user.entity";
import { ChallengeStatus } from "./challenge-status";

@Entity({
  name: "challenge",
})
export class ChallengeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(() => SeasonEntity, (season) => season.challenges)
  season!: Promise<SeasonEntity>;

  @CreateDateColumn({ update: false })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  versionId!: number;

  @OneToOne(() => DraftEntity, (draft) => draft.challenge)
  draft!: Promise<DraftEntity>;

  @OneToMany(
    () => ChallengeParticipantEntity,
    (challengeResult) => challengeResult.challenge
  )
  results!: Promise<ChallengeParticipantEntity[]>;

  @ManyToOne(() => UserEntity, (user) => user.createdChallenges)
  @JoinColumn({ name: "creator_id" })
  creator!: Promise<UserEntity>;

  @Column()
  creatorId!: number;

  @Column('text')
  status!: ChallengeStatus;
}
