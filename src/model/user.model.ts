import { Expense } from "./expense.model";
import { Group } from "./group.model";

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface CreateUser {
  username: string;
  password: string;
}

export type UserRelations = {
  groups: Group[];
  expenses: Expense[];
};

export type UserWithRelation<R extends Array<keyof UserRelations>> = User & {
  [K in R[number]]: UserRelations[K];
};
