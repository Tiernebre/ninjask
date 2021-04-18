import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { SeasonEntity } from "../season/season.entity";

@Entity({
  name: "challenge",
})
export class ChallengeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column({
    nullable: false,
  })
  description!: string;

  @ManyToOne(() => SeasonEntity, season => season.challenges)
  season!: SeasonEntity

  @CreateDateColumn({ nullable: false, readonly: true })
  createdAt!: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date
}