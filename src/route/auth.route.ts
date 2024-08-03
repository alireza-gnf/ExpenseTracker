import { Router } from "express";
import { createUserSchema, loginSchema } from "../module/dto/user.dto";
import { UserService } from "../services/user.service";
import { handleExpress } from "../module/utilities/handle-express";

export const makeAuthRouter = (userService: UserService) => {
  const app = Router();

  app.post("/register", (req, res) => {
    const dto = createUserSchema.parse(req.body);
    handleExpress(res, 201, () => userService.create(dto));
  });

  app.post("/login", (req, res) => {
    const dto = loginSchema.parse(req.body);
    handleExpress(res, 200, () => userService.login(dto));
  });

  return app;
};
