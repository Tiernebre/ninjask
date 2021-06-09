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

  @OneToMany(() => DraftPokemonEntity, (draftPokemon) => draftPokemon.draft, {
    cascade: true,
  })
  pokemon!: Promise<DraftPokemonEntity[]>;

  @Column()
  poolSize!: number;

  @Column()
  livePoolPokemonIndex!: number;

  @OneToMany(
    () => DraftSelectionEntity,
    (draftSelection) => draftSelection.draft
  )
  selections!: Promise<DraftSelectionEntity[]>;
}
