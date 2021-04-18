import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
  name: 'version-deny-list'
})
@Unique(["versionId", "pokemonId"])
export class VersionDenyList {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  versionId!: number

  @Column({ nullable: false })
  pokemonId!: number
}