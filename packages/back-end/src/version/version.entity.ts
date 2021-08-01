import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VersionDeniedPokemonEntity } from "./version-denied-pokemon.entity";

@Entity({ name: "versions" })
export class VersionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  versionGroupUrl!: string;

  @OneToMany(
    () => VersionDeniedPokemonEntity,
    (versionDeniedPokemon) => versionDeniedPokemon.version
  )
  deniedPokemon!: VersionDeniedPokemonEntity[];
}
