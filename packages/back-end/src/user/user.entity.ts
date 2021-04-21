import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // TODO: Auto-Gen this using PG instead of managing it within the app.
  @Column({ unique: true, type: "uuid" })
  accessKey!: string;

  @Column()
  nickname!: string;

  @Column({ nullable: false })
  password!: string;

  @CreateDateColumn({ update: false, nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;
}
