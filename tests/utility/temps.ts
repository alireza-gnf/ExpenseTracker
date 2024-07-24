import { createResource, prepareModel } from "../../src/model/Base.model";
import { Expense, expenses } from "../../src/model/Expense.model";
import {
  friends,
  Group,
  groups,
  otherFriends,
} from "../../src/model/Group.model";
import { GroupUser, groupUsersPivot } from "../../src/model/GroupUser.model";
import {
  chandler,
  joe,
  monicha,
  User,
  users,
} from "../../src/model/User.model";

export const tempUser = createResource(
  prepareModel<User>({ username: "tempUser" }, "user"),
  users
);

export const tempGroup = createResource(
  prepareModel<Group>({ title: "tempGroup", creatorId: tempUser.id }, "group"),
  groups
);

createResource(
  prepareModel<GroupUser>(
    {
      userId: tempUser.id,
      groupId: tempGroup.id,
    },
    "groupUser"
  ),
  groupUsersPivot
);

export const tempExpenses = [
  createResource(
    prepareModel<Expense>(
      {
        userId: chandler.id,
        groupId: friends.id,
        amount: 10000,
        description: "For cafe",
      },
      "expense"
    ),
    expenses
  ),
  createResource(
    prepareModel<Expense>(
      {
        userId: chandler.id,
        groupId: otherFriends.id,
        amount: 20000,
        description: "For cinema",
      },
      "expense"
    ),
    expenses
  ),
  createResource(
    prepareModel<Expense>(
      {
        userId: joe.id,
        groupId: friends.id,
        amount: 15000,
        description: "For bears",
      },
      "expense"
    ),
    expenses
  ),
  createResource(
    prepareModel<Expense>(
      {
        userId: monicha.id,
        groupId: otherFriends.id,
        amount: 30000,
        description: "For diner",
      },
      "expense"
    ),
    expenses
  ),
];
