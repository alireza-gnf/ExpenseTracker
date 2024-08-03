import request from "supertest";
import { User } from "../../src/model/user.model";
import { Expense } from "../../src/model/expense.model";
import { loggedInTemp } from "../utility/temps";
import { Express } from "express";
import { AppDataSource } from "../../src/data-source";
import { makeApp } from "../../src/api";

let app: Express;
let chandler: User;
let monicha: User;
let monichaSpent: Expense;
let joey: User;
let joeySpent: Expense;

const userExpenseUrl = "/users/expenses";
beforeAll(async () => {
  const dataSource = await AppDataSource.initialize();
  app = makeApp(dataSource);

  const { body: chandlerResponse } = await request(app)
    .post("/auth/register")
    .send({
      username: "chandler",
      password: "Chandler123",
    });

  chandler = chandlerResponse.data;

  const { body: monichaResponse } = await request(app)
    .post("/auth/register")
    .send({
      username: "monicha",
      password: "Monicha123",
    });

  monicha = monichaResponse.data;

  const { body: joeyResponse } = await request(app)
    .post("/auth/register")
    .send({
      username: "joey",
      password: "Joey1234",
    });
  joey = joeyResponse.data;

  const { body: friendsResponse } = await request(app)
    .post("/groups")
    .set({
      authorization: chandler.id,
    })
    .send({
      title: "friends",
    });
  const friends = friendsResponse.data;

  await request(app)
    .post(`/groups/${friends.id}/add-member`)
    .set({
      authorization: chandler.id,
    })
    .send({
      userId: monicha.id,
    });

  const { body: otherFriendsResponse } = await request(app)
    .post("/groups")
    .set({
      authorization: chandler.id,
    })
    .send({
      title: "other friends",
    });
  const otherFriends = otherFriendsResponse.data;

  await request(app)
    .post(`/groups/${otherFriends.id}/add-member`)
    .set({
      authorization: chandler.id,
    })
    .send({
      userId: joey.id,
    });

  const { body: joeySpentResponse } = await request(app)
    .post(userExpenseUrl)
    .set({
      authorization: joey.id,
    })
    .send({
      groupId: otherFriends.id,
      amount: 50000,
      description: "Bought Bears",
    });

  joeySpent = joeySpentResponse.data;

  const { body: monichaSpentResponse } = await request(app)
    .post(userExpenseUrl)
    .set({
      authorization: monicha.id,
    })
    .send({
      groupId: friends.id,
      amount: 100000,
      description: "Dinner Party",
    });

  monichaSpent = monichaSpentResponse.data;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

const userGroupExpenseUrl = "/users/group-expenses";
describe("Get Expenses", () => {
  it("Should fail if user is not logged in", async () => {
    await request(app).get(userExpenseUrl).send().expect(401);
    await request(app).get(userGroupExpenseUrl).send().expect(401);
  });

  describe("Get user spents", () => {
    it("Should return empty if user hasn't spent anything", async () => {
      const { body: expenseResponse } = await request(app)
        .get(userExpenseUrl)
        .set({
          authorization: chandler.id,
        })
        .send()
        .expect(200);

      expect(expenseResponse.data).toEqual([]);
    });
  });

  it("Should return array of expenses", async () => {
    const { body: expenseResponse } = await request(app)
      .get(userExpenseUrl)
      .set({
        authorization: joey.id,
      })
      .send()
      .expect(200);

    expect(expenseResponse.data).toStrictEqual([joeySpent]);
  });

  describe("Get user's groups spents", () => {
    it("Should fail if user does not have any groups", async () => {
      const tempUser = await loggedInTemp(app);
      await request(app)
        .get(userGroupExpenseUrl)
        .set({
          authorization: tempUser.id,
        })
        .send()
        .expect(400);
    });
  });

  it("Should return array of expenses for the groups this user is in", async () => {
    const { body: expenseResponse } = await request(app)
      .get(userGroupExpenseUrl)
      .set({
        authorization: chandler.id,
      })
      .send()
      .expect(200);

    expect(expenseResponse.data).toStrictEqual([monichaSpent, joeySpent]);
  });
});
