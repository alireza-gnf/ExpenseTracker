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

  it("Should fail if username already exists", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        username: "tempUser123",
        password: "Stron123",
      })
      .expect(400);
  });
});
