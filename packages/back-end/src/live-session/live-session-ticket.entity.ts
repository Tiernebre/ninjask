import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../user";

@Entity({
  name: "live_session_ticket",
})
export class LiveSessionTicketEntity {
  @PrimaryGeneratedColumn()
  token!: string;

  @Column()
  redeemed!: boolean;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => UserEntity, (user) => user.liveSessionTickets)
  @JoinColumn({ name: "user_id" })
  user!: Promise<UserEntity>;

  @Column()
  userId!: number;
}
