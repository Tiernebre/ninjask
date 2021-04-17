import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pokemon' })
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
}