import { CreateExpense } from "../model/expense.model";
import {
  CreateGroup,
  Group,
  GroupRelations,
  GroupWithRelation,
} from "../model/group.model";
import {
  CreateUser,
  User,
  UserRelations,
  UserWithRelation,
} from "../model/user.model";

export interface IUserRepository {
  create(user: CreateUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  userWithRelations<R extends Array<keyof UserRelations>>(
    id: string,
    selectRelations: R
  ): Promise<UserWithRelation<R> | null>;
  addExpense(
    expense: CreateExpense,
    user: User
  ): Promise<UserWithRelation<["expenses"]>>;
}

export interface IGroupRepository {
  create(group: CreateGroup, user: User): Promise<Group>;
  // findById<R extends Array<keyof GroupRelations>>(
  //   id: string,
  //   relations: R
  // ): Promise<Group | GroupWithRelation<R> | null>;
  findById(id: string): Promise<Group | null>;
  groupWithRelations<R extends Array<keyof GroupRelations>>(
    id: string,
    selectRelations: R
  ): Promise<GroupWithRelation<R> | null>;
  addMember(group: Group, user: User): Promise<GroupWithRelation<["users"]>>;
}
