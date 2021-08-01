import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "versions" })
export class VersionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  versionGroupUrl!: string;
}
