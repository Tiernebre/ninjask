import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Challenge } from "../challenge/challenge";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ name: "challenge_participants" })
export class ChallengeParticipantEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ update: false })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => ChallengeEntity, (challenge) => challenge.results)
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
}
