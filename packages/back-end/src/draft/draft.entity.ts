import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SeasonEntity } from "../season/season.entity";
import { DraftPokemonEntity } from "./draft-pokemon.entity";

@Entity({
  name: "draft",
})
export class DraftEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => SeasonEntity, season => season.draft)
  season!: SeasonEntity;

  @OneToMany(() => DraftPokemonEntity, draftPokemon => draftPokemon.draft)
  pokemon!: Promise<DraftPokemonEntity[]>;
}
