import request from "supertest";
import { app } from "../../src/api";

export const loggedInTemp = async () => {
  const { body: tempUserResponse } = await request(app)
    .post("/auth/register")
    .send({
      username: "tempUser",
      password: "Strong123",
    });
  return tempUserResponse.data;
};
