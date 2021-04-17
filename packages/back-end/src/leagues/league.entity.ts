import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "league",
})
export class LeagueEntity {
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
}
