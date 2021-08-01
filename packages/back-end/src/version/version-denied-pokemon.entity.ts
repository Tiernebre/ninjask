import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { VersionEntity } from "./version.entity";

@Entity({
  name: "version_denied_pokemon",
})
@Unique(["versionId", "pokemonId"])
export class VersionDeniedPokemonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => VersionEntity, (version) => version.deniedPokemon)
  version!: VersionEntity;

  @Column()
  pokemonId!: number;
}
