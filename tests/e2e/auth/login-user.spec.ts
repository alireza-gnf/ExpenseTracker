import request from "supertest";
import { app } from "../../../src/api";

describe("Login User", () => {
  it("Should fail if username or password are incorrect", async () => {
    await request(app)
      .post("/auth/login")
      .send({
        username: "temp",
        password: "Strong123",
      })
      .expect(401);
  });

  it("Should log user in", async () => {
    await request(app).post("/auth/register").send({
      username: "tempUser",
      password: "Strong123",
    });

    await request(app)
      .post("/auth/login")
      .send({
        username: "tempUser",
        password: "Strong123",
      })
      .expect(200);
  });
});
