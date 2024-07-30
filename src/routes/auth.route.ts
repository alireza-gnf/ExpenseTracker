import { Router } from "express";
import { createUserSchema, loginSchema } from "../modules/dto/user.dto";
import { userService } from "../dependency";

export const app = Router();

app.post("/register", (req, res) => {
  const dto = createUserSchema.parse(req.body);
  const newUser = userService.create(dto);

  res.status(201).send({
    data: {
      id: newUser.id,
      username: newUser.username, // Implement Excluding keys from returning object
    },
  });
});

app.post("/login", (req, res) => {
  const dto = loginSchema.parse(req.body);
  const user = userService.login(dto);
  res.status(200).send({
    data: {
      id: user.id,
      username: user.username, // Implement Excluding keys from returning object
    },
  });
});
