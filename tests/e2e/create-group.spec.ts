import request from "supertest";
import { app } from "../../src/api";
import { User } from "../../src/models/User.model";

let tempUser: User;

beforeAll(async () => {
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
