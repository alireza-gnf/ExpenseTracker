import request from "supertest";
import { app } from "../../src/api";
import { User } from "../../src/models/User.model";
import { Group } from "../../src/models/Group.model";

let chandler: User;
let monicha: User;
let friends: Group;

beforeAll(async () => {
  await request(app).post("/auth/register").send({
    username: "chandler",
    password: "Chandler123",
  });

  await request(app).post("/auth/register").send({
    username: "monicha",
    password: "Monicha123",
  });

  const { body: chandlerResponse } = await request(app)
    .post("/auth/login")
    .send({
      username: "chandler",
      password: "Chandler123",
    });

  chandler = chandlerResponse.data;

  const { body: monichaResponse } = await request(app)
    .post("/auth/login")
    .send({
      username: "monicha",
      password: "Monicha123",
    });

  monicha = monichaResponse.data;

  const { body: friendsResponse } = await request(app)
    .post("/groups")
    .set({
      authorization: chandler.id,
    })
    .send({
      title: "friends",
    });
  friends = friendsResponse.data;
});

const URL = `/users/expenses`;
describe("Create Expense", () => {
  it("Should fail if user is not logged in", async () => {
    await request(app).post(URL).send().expect(401);
  });

  it("Should fail if amount is not set or incorrect", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        groupId: friends.id,
        description: "Monicha's birthday party",
      })
      .expect(400);

    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        groupId: friends.id,
        amount: 2500,
        description: "Monicha's birthday party",
      })
      .expect(400);
  });

  it("Should fail if description is not set or incorrect", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        groupId: friends.id,
        amount: 6000,
      })
      .expect(400);

    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        groupId: friends.id,
        amount: 6000,
        description: "part",
      })
      .expect(400);

    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        groupId: friends.id,
        amount: 6000,
        description:
          "That time we went to cafe and Ross was bluffing about his job",
      })
      .expect(400);
  });

  it("Should fail if groupId is not set or not found", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        amount: 6000,
        description: "Monicha's birthday party",
      })
      .expect(400);

    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        groupId: "wrongId",
        amount: 6000,
        description: "Monicha's birthday party",
      })
      .expect(404);
  });

  it("Should fail if user is not a member of the group", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: monicha.id,
      })
      .send({
        groupId: friends.id,
        amount: 6000,
        description: "Monicha's birthday party",
      })
      .expect(403);
  });

  it("Should create expense", async () => {
    const { body: expenseResponse } = await request(app)
      .post(URL)
      .set({
        authorization: chandler.id,
      })
      .send({
        groupId: friends.id,
        amount: 6000,
        description: "Monicha's birthday party",
      })
      .expect(201);

    const expense = expenseResponse.data;
    expect(expense.groupId).toStrictEqual(friends.id);
    expect(expense.userId).toStrictEqual(chandler.id);
    expect(expense.amount).toBe(6000);
    expect(expense.description).toBe("Monicha's birthday party");
  });
});
