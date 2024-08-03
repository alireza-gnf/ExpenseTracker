import request from "supertest";
import { User } from "../../src/model/user.model";
import { Express } from "express";
import { AppDataSource } from "../../src/data-source";
import { makeApp } from "../../src/api";

let app: Express;
let tempUser: User;

beforeAll(async () => {
  const dataSource = await AppDataSource.initialize();
  app = makeApp(dataSource);
  await request(app).post("/auth/register").send({
    username: "tempUser",
    password: "Strong123",
  });

  const { body } = await request(app).post("/auth/login").send({
    username: "tempUser",
    password: "Strong123",
  });

  tempUser = body.data;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Group", () => {
  describe("Create", () => {
    it("Should fail if user is not logged in", async () => {
      await request(app).post("/groups").send().expect(401);
    });

    it("Should fail if title is not valid", async () => {
      await request(app)
        .post("/groups")
        .set({
          authorization: tempUser.id,
        })
        .send({
          title: "This is a long title",
        })
        .expect(400);
    });

    it("Should create group", async () => {
      const { body: tempGroupResponse } = await request(app)
        .post("/groups")
        .set({
          authorization: tempUser.id,
        })
        .send({
          title: "tempGroup",
        })
        .expect(201);

      const group = tempGroupResponse.data;
      expect(group.title).toBe("tempGroup");
      expect(group.creatorId).toStrictEqual(tempUser.id);
    });
  });
});
