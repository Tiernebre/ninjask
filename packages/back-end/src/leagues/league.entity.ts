import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SeasonEntity } from "../season/season.entity";
import { UserEntity } from "../user";

@Entity({
  name: "league",
})
export class LeagueEntity {
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

  @OneToMany(() => SeasonEntity, (season) => season.league)
  seasons!: Promise<SeasonEntity[]>;

  @CreateDateColumn({ nullable: false, update: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;

  @ManyToOne(() => UserEntity, (user) => user.leagues)
  creator!: Promise<UserEntity>;
}
