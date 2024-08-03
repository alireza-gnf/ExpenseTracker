import { Expense } from "./expense.model";
import { User } from "./user.model";

export interface Group {
  id: string;
  title: string;
  creatorId: string;
}

export interface CreateGroup {
  title: string;
  creatorId: string;
}

export type GroupRelations = {
  users: User[];
  expenses: Expense[];
};

export type GroupWithRelation<R extends Array<keyof GroupRelations>> = Group & {
  [K in R[number]]: GroupRelations[K];
};
