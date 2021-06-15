import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant/challenge-participant.entity";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { LiveSessionTicketEntity } from "../session/live-session-ticket.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid" })
  accessKey!: string;

  @Column()
  nickname!: string;

  @Column()
  password!: string;

  @CreateDateColumn({ update: false })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => ChallengeParticipantEntity,
    (challengeResult) => challengeResult.user
  )
  challengeResults!: Promise<ChallengeParticipantEntity[]>;

  @Column()
  tokenVersion!: number;

  @OneToMany(() => ChallengeEntity, (challenge) => challenge.creator)
  createdChallenges!: Promise<ChallengeEntity[]>;

  @OneToMany(
    () => LiveSessionTicketEntity,
    (liveSessionTicket) => liveSessionTicket.user
  )
  liveSessionTickets!: Promise<LiveSessionTicketEntity[]>;
}
