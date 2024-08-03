import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { GroupEntity } from "./group.entity";
import { ExpenseEntity } from "./expense.entity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => GroupEntity, (group) => group.users)
  groups!: GroupEntity[];

  @OneToMany(() => ExpenseEntity, (expense) => expense.user, { cascade: true })
  expenses!: ExpenseEntity[];
}
