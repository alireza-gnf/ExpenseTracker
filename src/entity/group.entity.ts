import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { ExpenseEntity } from "./expense.entity";

@Entity("groups")
export class GroupEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  creatorId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable()
  users!: UserEntity[];

  @OneToMany(() => ExpenseEntity, (expense) => expense.group)
  expenses!: ExpenseEntity[];

  @ManyToOne(() => UserEntity)
  creator!: UserEntity;
}
