import { Expense } from "./Expense.model";
import { Group } from "./Group.model";
import { GroupUser } from "./GroupUser.model";

export interface User {
  id: string;
  username: string;
  password: string;
}

export const userGroups = (
  userId: string,
  pivot: Array<GroupUser>,
  groups: Array<Group>
): Array<Group> => {
  return groups.filter((group) =>
    pivot.find((piv) => piv.userId === userId && piv.groupId === group.id)
  );
};

export const userExpenses = (
  userId: string,
  expenses: Array<Expense>
): Array<Expense> => expenses.filter((expense) => expense.userId === userId);

export const userGroupExpenses = (
  userGPs: Array<Group>,
  expenses: Array<Expense>
): Array<Expense> => {
  return expenses.filter((expense) =>
    userGPs.find((userGroup) => expense.groupId === userGroup.id)
  );
};
