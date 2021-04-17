import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'league'
})
export class LeagueEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string
}