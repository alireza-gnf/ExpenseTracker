import { app } from "../../src/api";
import request from "supertest";
import { tempExpenses, tempUser } from "../utility/temps";
import { chandler } from "../../src/model/User.model";

const userExpenseUrl = "/users/expenses";
const userGroupExpenseUrl = "/users/group-expenses";
describe("Get Expenses", () => {
  describe("Get user spents", () => {
    it("Should fail if user is not logged in", async () => {
      await request(app).get(userExpenseUrl).send().expect(401);
    });

    it("Should return empty if user hasn't spent anything", async () => {
      const { body: data } = await request(app)
        .get(userExpenseUrl)
        .set({
          authorization: tempUser.id.value,
        })
        .send()
        .expect(200);

      expect(data).toEqual([]);
    });
  });

  it("Should return array of expenses", async () => {
    const { body: data } = await request(app)
      .get(userExpenseUrl)
      .set({
        authorization: chandler.id.value,
      })
      .send()
      .expect(200);

    expect(data).toStrictEqual([tempExpenses[0], tempExpenses[1]]);
  });

  describe("Get user's groups spents", () => {
    it("Should fail if user is not logged in", async () => {
      await request(app).get(userGroupExpenseUrl).send().expect(401);
    });

    it("Should return empty if user does not have a group", async () => {
      const { body: data } = await request(app)
        .get(userGroupExpenseUrl)
        .set({
          authorization: tempUser.id.value,
        })
        .send()
        .expect(200);

      expect(data).toEqual([]);
    });
  });

  it("Should return array of expenses for the groups of this user", async () => {
    const { body: data } = await request(app)
      .get(userGroupExpenseUrl)
      .set({
        authorization: chandler.id.value,
      })
      .send()
      .expect(200);

    expect(data).toStrictEqual(tempExpenses);
  });
});
