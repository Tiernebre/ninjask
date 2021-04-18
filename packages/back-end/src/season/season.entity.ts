
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "season",
})
export class SeasonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false
  })
  name!: string;

  @Column({
    nullable: false
  })
  description!: string;
}
