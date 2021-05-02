import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @Column({ nullable: false })
  password!: string;

  @CreateDateColumn({ update: false, nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;

  @ManyToMany(() => ChallengeEntity, (challenge) => challenge.users)
  challenges!: Promise<ChallengeEntity[]>;

  @Column({
    nullable: false,
    default: 0,
    comment:
      "Used to version refresh tokens and much more easily revoke out-in-the-wild access/refresh tokens",
  })
  tokenVersion!: number;
}
