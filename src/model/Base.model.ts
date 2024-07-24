import { v4 } from "uuid";
import { User } from "./User.model";
import { Group } from "./Group.model";
import { GroupUser } from "./GroupUser.model";
import { Expense } from "./Expense.model";
import { NotFound } from "../modules/utilities/http-error";

type Models = User | Group | GroupUser | Expense;
export const createResource = <T extends Models>(
  resource: T,
  list: Array<T>
): T => {
  list.push(resource);
  return resource;
};

export const prepareModel = <T extends Models>(
  dto: Omit<T, "id">,
  type: T["id"]["type"]
): T => {
  return { ...dto, id: { value: v4(), type } } as T;
};

export const resourceExists = <T, K extends keyof T>(
  value: T[K],
  key: K,
  list: Array<T>
): boolean => {
  return Boolean(list.find((item) => item[key] === value));
};

type FindModel = <T extends Models>(
  id: T["id"]["value"],
  list: Array<T>
) => T | undefined;

export const findById: FindModel = (id, list) => {
  return list.find((item) => item.id.value === id);
};

export const findOrFail: FindModel = (id, list) => {
  const model = findById(id, list);
  if (model) {
    return model;
  }

  throw new NotFound();
};
