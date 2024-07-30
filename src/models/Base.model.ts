import { User } from "./User.model";
import { Group } from "./Group.model";
import { GroupUser } from "./GroupUser.model";
import { Expense } from "./Expense.model";

type Models = User | Group | GroupUser | Expense;

export const create = <T extends Models>(resource: T, list: Array<T>): T => {
  list.push(resource);
  return resource;
};

export const findBy = <T extends Models, K extends keyof T>(
  value: T[K],
  key: K,
  list: Array<T>
): T | undefined => {
  return list.find((item) => item[key] === value);
};
