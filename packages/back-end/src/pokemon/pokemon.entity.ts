import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "pokemon" })
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
}
