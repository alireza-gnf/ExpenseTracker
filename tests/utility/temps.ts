import request from "supertest";
import { Express } from "express";

export const loggedInTemp = async (app: Express) => {
  const { body: tempUserResponse } = await request(app)
    .post("/auth/register")
    .send({
      username: "tempUser",
      password: "Strong123",
    });
  return tempUserResponse.data;
};
