import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
  name: "version_denied_pokemon",
})
@Unique(["versionId", "pokemonId"])
export class VersionDeniedPokemonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  versionId!: number;

  @Column()
  pokemonId!: number;
}
