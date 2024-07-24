import { Expense } from "./Expense.model";
import { Group } from "./Group.model";
import { GroupUser } from "./GroupUser.model";

export type UserId = {
  value: string;
  type: "user";
};

export interface User {
  id: UserId;
  username: string;
}

export const userGroups = (
  userId: UserId,
  pivot: Array<GroupUser>,
  groups: Array<Group>
): Array<Group> => {
  return groups.filter((group) =>
    pivot.find(
      (piv) =>
        piv.userId.value === userId.value &&
        piv.groupId.value === group.id.value
    )
  );
};

export const userExpenses = (
  userId: UserId,
  expenses: Array<Expense>
): Array<Expense> =>
  expenses.filter((expense) => expense.userId.value === userId.value);

export const userGroupExpenses = (
  userGPs: Array<Group>,
  expenses: Array<Expense>
): Array<Expense> => {
  return expenses.filter((expense) =>
    userGPs.find((userGroup) => expense.groupId.value === userGroup.id.value)
  );
};

export const users: Array<User> = [
  {
    id: {
      value: "ad346a53-aca7-4507-9071-5caa9aec81cf",
      type: "user",
    },
    username: "Chandler",
  },
  {
    id: {
      value: "28b5d3b6-004d-4b0f-b9e0-8c1015b54ae1",
      type: "user",
    },
    username: "Joey",
  },
  {
    id: {
      value: "f827051e-1fbf-4b35-ad44-76740487fdba",
      type: "user",
    },
    username: "Ross",
  },
  {
    id: {
      value: "add611e9-c03d-4ebc-ab8e-7e9f12f8ca7e",
      type: "user",
    },
    username: "Monicha",
  },
  {
    id: {
      value: "120083f3-11bc-459d-bd12-0f77f8875499",
      type: "user",
    },
    username: "Phoebe",
  },
  {
    id: {
      value: "7bcd75bb-bf12-42d3-95df-887849b67817",
      type: "user",
    },
    username: "Rachel",
  },
];

export const chandler = users[0];
export const joe = users[1];
export const monicha = users[3];
