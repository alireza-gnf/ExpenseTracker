import request from "supertest";
import { app } from "../../src/api";
import { chandler, monicha } from "../../src/model/User.model";
import { friends } from "../../src/model/Group.model";

const URL = `/users/expenses`;
describe("Create Expense", () => {
  it("Should fail if user is not logged in", async () => {
    await request(app).post(URL).send().expect(401);
  });

  it("Should fail if groupId is not specified", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        amount: 2500,
        description: "Monicha's birthday party",
      })
      .expect(400);
  });

  it("Should fail if group not found", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        groupId: "wrongId",
      })
      .expect(400);
  });

  it("Should fail if user is not a member of the group", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: monicha.id.value,
      })
      .send({
        groupId: friends.id.value,
      })
      .expect(400);
  });

  it("Should fail if amount is not specified", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        groupId: friends.id.value,
        description: "Monicha's birthday party",
      })
      .expect(400);
  });

  it("Should fail if amount is under 5000", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        groupId: friends.id.value,
        amount: 2500,
        description: "Monicha's birthday party",
      })
      .expect(400);
  });

  it("Should fail if description is not specified", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        groupId: friends.id.value,
        amount: 6000,
      })
      .expect(400);
  });

  it("Should fail if description is less than 5", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        groupId: friends.id.value,
        amount: 6000,
        description: "part",
      })
      .expect(400);
  });

  it("Should fail if description is more than 50", async () => {
    await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        groupId: friends.id.value,
        amount: 6000,
        description:
          "That time we went to cafe and Ross was bluffing about his job",
      })
      .expect(400);
  });

  it("Should create expense", async () => {
    const { body } = await request(app)
      .post(URL)
      .set({
        authorization: chandler.id.value,
      })
      .send({
        groupId: friends.id.value,
        amount: 6000,
        description: "Monicha's birthday party",
      })
      .expect(201);

    const { data } = body;
    expect(data.groupId).toStrictEqual(friends.id);
    expect(data.userId).toStrictEqual(chandler.id);
    expect(data.amount).toBe(6000);
    expect(data.description).toBe("Monicha's birthday party");
  });
});
