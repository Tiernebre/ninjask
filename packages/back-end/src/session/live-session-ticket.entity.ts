import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user";

@Entity({
  name: 'live_session_ticket'
})
export class LiveSessionTicketEntity {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  redeemed!: boolean;

  @Column()
  createdAt!: Date

  @ManyToOne(() => UserEntity, (user) => user.liveSessionTickets)
  user!: Promise<UserEntity>
}