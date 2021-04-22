import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // TODO: Auto-Gen this using PG instead of managing it within the app.
  @Column({ unique: true, type: "uuid" })
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
}
