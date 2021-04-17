import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
}