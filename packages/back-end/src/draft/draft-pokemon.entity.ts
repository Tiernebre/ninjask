import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DraftEntity } from "./draft.entity";

@Entity({
  name: "draft_pokemon",
})
export class DraftPokemonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => DraftEntity, (draft) => draft.pokemon)
  draft!: Promise<DraftEntity>;
}
