
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeagueEntity } from "../leagues/league.entity";

@Entity({
  name: "season",
})
export class SeasonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false
  })
  name!: string;

  @Column({
    nullable: false
  })
  description!: string;

  @ManyToOne(() => LeagueEntity, league => league.seasons)
  league!: LeagueEntity;
}
