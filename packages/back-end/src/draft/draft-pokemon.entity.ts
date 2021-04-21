import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { DraftEntity } from "./draft.entity";

@Entity({
  name: "draft_pokemon",
})
@Unique(["draft", "pokemonId"])
export class DraftPokemonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => DraftEntity, (draft) => draft.pokemon)
  draft!: DraftEntity;

  @Column({ nullable: false })
  pokemonId!: number;

  @CreateDateColumn({ update: false, nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;
}
