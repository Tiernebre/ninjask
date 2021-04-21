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

  @Column({ unique: true, type: 'uuid', default: () => 'uuid_generate_v4()' })
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