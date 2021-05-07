import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { DraftEntity } from "../draft/draft.entity";
import { SeasonEntity } from "../season/season.entity";
import { UserEntity } from "../user/user.entity";

@Entity({
  name: "challenge",
})
export class ChallengeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column({
    nullable: false,
  })
  description!: string;

  @ManyToOne(() => SeasonEntity, (season) => season.challenges)
  season!: Promise<SeasonEntity>;

  @CreateDateColumn({ nullable: false, update: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;

  @Column({
    nullable: false,
  })
  versionId!: number;

  @OneToOne(() => DraftEntity, (draft) => draft.challenge)
  draft!: Promise<DraftEntity>;

  @ManyToMany(() => UserEntity, (user) => user.challenges)
  @JoinTable({
    name: "user_challenges",
  })
  users!: Promise<UserEntity[]>;
}
