import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SeasonEntity } from "../season/season.entity";

@Entity({
  name: "draft",
})
export class DraftEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => SeasonEntity, season => season.draft)
  season!: SeasonEntity;
}
