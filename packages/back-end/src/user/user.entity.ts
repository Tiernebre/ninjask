import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";

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

  @ManyToMany(() => ChallengeEntity, (challenge) => challenge.users)
  challenges!: Promise<ChallengeEntity[]>;

  @Column()
  tokenVersion!: number;

  @OneToMany(() => ChallengeEntity, (challenge) => challenge.creator)
  createdChallenges!: Promise<ChallengeEntity[]>;
}
