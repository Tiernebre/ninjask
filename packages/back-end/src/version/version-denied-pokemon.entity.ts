import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
  name: "version-denied-pokemon",
})
@Unique(["versionId", "pokemonId"])
export class VersionDeniedPokemonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  versionId!: number;

  @Column({ nullable: false })
  pokemonId!: number;
}
