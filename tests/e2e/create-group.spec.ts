import request from "supertest";
import { app } from "../../src/api";
import { chandler } from "../../src/model/User.model";

describe("Group", () => {
  describe("Create", () => {
    it("Should fail if user is not logged in", async () => {
      await request(app).post("/groups").send().expect(401);
    });

    it("Should fail if title is not sent", async () => {
      await request(app)
        .post("/groups")
        .set({
          authorization: chandler.id.value,
        })
        .send()
        .expect(400);
    });

    it("Should fail if title is less than 5", async () => {
      await request(app)
        .post("/groups")
        .set({
          authorization: chandler.id.value,
        })
        .send({
          title: "asdf",
        })
        .expect(400);
    });

    it("Should fail if title is more than 15", async () => {
      await request(app)
        .post("/groups")
        .set({
          authorization: chandler.id.value,
        })
        .send({
          title: "This is a long title",
        })
        .expect(400);
    });

    it("Should create group", async () => {
      const { body } = await request(app)
        .post("/groups")
        .set({
          authorization: chandler.id.value,
        })
        .send({
          title: "Friends",
        })
        .expect(201);

      const { data } = body;
      expect(data.title).toBe("Friends");
      expect(data.creatorId).toStrictEqual(chandler.id);
    });
  });
});
