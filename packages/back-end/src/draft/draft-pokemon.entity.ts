import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { DraftSelectionEntity } from "../draft-selection/draft-selection.entity";
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

  @OneToOne(
    () => DraftSelectionEntity,
    (draftSelection) => draftSelection.pokemon,
    {
      nullable: true,
    }
  )
  draftSelection!: Promise<DraftSelectionEntity | null>;
}
