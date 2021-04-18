import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn({ nullable: false, readonly: true })
  createdAt!: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date
}