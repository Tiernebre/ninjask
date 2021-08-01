import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VersionEntity } from "./version.entity";

@Entity({
  name: "version_denied_pokemon",
})
export class VersionDeniedPokemonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => VersionEntity, (version) => version.deniedPokemon)
  @JoinColumn({ name: "version_id" })
  version!: VersionEntity;

  @Column()
  pokemonId!: number;
}
