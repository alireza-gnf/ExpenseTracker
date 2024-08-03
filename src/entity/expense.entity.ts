import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { GroupEntity } from "./group.entity";

@Entity("expenses")
export class ExpenseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  userId!: string;

  @Column()
  groupId!: string;

  @Column()
  amount!: number;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  user!: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.expenses)
  group!: UserEntity;
}
