import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}
