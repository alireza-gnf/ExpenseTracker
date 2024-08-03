import request from "supertest";
import { Express } from "express";
import { AppDataSource } from "../../../src/data-source";
import { makeApp } from "../../../src/api";

let app: Express;

beforeAll(async () => {
  const dataSource = await AppDataSource.initialize();
  app = makeApp(dataSource);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

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
