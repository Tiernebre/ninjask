import {
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { DraftPokemonEntity } from "./draft-pokemon.entity";

@Entity({
  name: "draft",
})
@Check(`"live_pool_pokemon_index" >= -1`)
@Check(`"live_pool_pokemon_index" < "pool_size"`)
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

  @Column({
    nullable: false,
    comment: "The amount of pokemon this draft should have.",
  })
  poolSize!: number;

  @Column({
    nullable: false,
    default: -1,
    comment: "Index for tracking a live pool feed of the draft.",
  })
  livePoolPokemonIndex!: number;
}
