import request from "supertest";
import { app } from "../../../src/api";

describe("Register User", () => {
  it("Should fail if username and password are not valid", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        username: "t",
        password: "Strong123",
      })
      .expect(400);

    await request(app)
      .post("/auth/register")
      .send({
        username: "-temp",
        password: "Strong123",
      })
      .expect(400);

    await request(app)
      .post("/auth/register")
      .send({
        username: "temp123",
        password: "StrongWithoutDigit",
      })
      .expect(400);
  });

  it("Should create User", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        username: "tempUser123",
        password: "Strong123",
      })
      .expect(201);
  });
});
