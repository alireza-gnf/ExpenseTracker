import { expenses } from "../../../src/model/Expense.model";
import { groups } from "../../../src/model/Group.model";
import { groupUsersPivot } from "../../../src/model/GroupUser.model";
import {
  chandler,
  userExpenses,
  userGroupExpenses,
  userGroups,
} from "../../../src/model/User.model";
import { tempExpenses, tempUser } from "../../utility/temps";

describe("Get User expenses", () => {
  it("Should return empty array if user haven't spent anything", async () => {
    expect(userExpenses(tempUser.id, expenses)).toStrictEqual([]);
  });

  it("Should return array of user expenses", async () => {
    expect(userExpenses(chandler.id, expenses)).toStrictEqual([
      tempExpenses[0],
      tempExpenses[1],
    ]);
  });

  it("Should return array of expenses for groups that include this user", async () => {
    expect(
      userGroupExpenses(
        userGroups(chandler.id, groupUsersPivot, groups),
        expenses
      )
    ).toStrictEqual(tempExpenses);
  });
});
