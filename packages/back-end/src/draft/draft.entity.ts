import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { DraftSelectionEntity } from "../draft-selection";
import { DraftPokemonEntity } from "./draft-pokemon.entity";

@Entity({
  name: "draft",
})
export class DraftEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => ChallengeEntity)
  @JoinColumn()
  challenge!: Promise<ChallengeEntity>;

  @Column()
  challengeId!: number;

  @OneToMany(() => DraftPokemonEntity, (draftPokemon) => draftPokemon.draft, {
    cascade: true,
  })
  pokemon!: Promise<DraftPokemonEntity[]>;

  // extraPoolSize indicates the number of extra pokemon to be purposely pooled. Essentially:
  // this is the number of undrafted Pokemon free agents that will end up being available after the draft.
  @Column()
  extraPoolSize!: number;

  @Column()
  livePoolPokemonIndex!: number;

  @OneToMany(
    () => DraftSelectionEntity,
    (draftSelection) => draftSelection.draft
  )
  selections!: Promise<DraftSelectionEntity[]>;
}
