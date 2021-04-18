import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SeasonEntity } from "../season/season.entity";

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

  @CreateDateColumn({ nullable: false, readonly: true })
  createdAt!: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date
}
