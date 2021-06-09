import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { DraftPokemonEntity } from "../draft/draft-pokemon.entity";
import { DraftEntity } from "../draft/draft.entity";

@Entity({
  name: "draft_selection",
})
export class DraftSelectionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => ChallengeParticipantEntity,
    (challengeParticipant) => challengeParticipant.draftSelections
  )
  challengeParticipant!: Promise<ChallengeParticipantEntity>;

  @Column()
  roundNumber!: number;

  @Column()
  pickNumber!: number;

  @OneToOne(
    () => DraftPokemonEntity,
    (draftPokemon) => draftPokemon.draftSelection,
    {
      nullable: true,
    }
  )
  @JoinColumn({
    name: "pokemon_id",
  })
  pokemon!: Promise<DraftPokemonEntity | null>;

  @Column()
  pokemonId!: number;

  @ManyToOne(
    () => DraftEntity,
    (draft) => draft.selections
  )
  @JoinColumn({
    name: "draft_id",
  })
  draft!: Promise<DraftEntity>;

  @Column()
  draftId!: number;
}
