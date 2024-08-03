import request from "supertest";
import { User } from "../../src/model/user.model";

import { Express } from "express";
import { AppDataSource } from "../../src/data-source";
import { makeApp } from "../../src/api";

let app: Express;
let chandler: User;
let friends: User;
let joey: User;
const genUrl = (gpId: string) => `/groups/${gpId}/add-member`;

beforeAll(async () => {
  const dataSource = await AppDataSource.initialize();
  app = makeApp(dataSource);
  await request(app).post("/auth/register").send({
    username: "chandler",
    password: "Chandler123",
  });

  const { body: chandlerResponse } = await request(app)
    .post("/auth/login")
    .send({
      username: "chandler",
      password: "Chandler123",
    });

  chandler = chandlerResponse.data;

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

  friends = friendsResponse.data;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Group", () => {
  describe("Create", () => {
    it("Should fail if user is not logged in", async () => {
      await request(app).post(genUrl(friends.id)).send().expect(401);
    });

    it("Should fail if group not found", async () => {
      await request(app)
        .post(genUrl("wrong"))
        .set({
          authorization: chandler.id,
        })
        .send({
          userId: joey.id,
        })
        .expect(404);
    });

    it("Should fail if user id not sent", async () => {
      await request(app)
        .post(genUrl(friends.id))
        .set({
          authorization: chandler.id,
        })
        .send()
        .expect(400);
    });

    it("Should fail if user id not found", async () => {
      await request(app)
        .post(genUrl(friends.id))
        .set({
          authorization: chandler.id,
        })
        .send({
          userId: "wrongId",
        })
        .expect(404);
    });

    it("Should fail if user is already a member of the group", async () => {
      await request(app)
        .post(genUrl(friends.id))
        .set({
          authorization: chandler.id,
        })
        .send({
          userId: chandler.id,
        })
        .expect(400);
    });

    it("Should Add User to the group", async () => {
      await request(app)
        .post(genUrl(friends.id))
        .set({
          authorization: chandler.id,
        })
        .send({
          userId: joey.id,
        })
        .expect(201);
    });
  });
});
