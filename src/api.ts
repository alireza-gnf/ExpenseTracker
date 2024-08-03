import express, { NextFunction, Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { ZodError } from "zod";
import { HttpError } from "./module/utilities/http-error";
import { DataSource } from "typeorm";
import { UserOrmRepository } from "./repository/user.repo";
import { UserService } from "./services/user.service";
import { makeAuthRouter } from "./route/auth.route";
import { makeUserRouter } from "./route/user.route";
import { GroupService } from "./services/group.service";
import { GroupOrmRepository } from "./repository/group.repo";
import { makeGroupRouter } from "./route/group.route";

export const makeApp = (dataSource: DataSource) => {
  const app = express();
  app.use(express.json());

  const userRepo = new UserOrmRepository(dataSource);
  const userService = new UserService(userRepo);

  const groupRepo = new GroupOrmRepository(dataSource);
  const groupService = new GroupService(groupRepo);
  app.use("/auth", makeAuthRouter(userService));
  app.use(
    "/users",
    authMiddleware(userService),
    makeUserRouter(userService, groupService)
  );
  app.use(
    "/groups",
    authMiddleware(userService),
    makeGroupRouter(groupService, userService)
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
      res.status(400).send({ message: err.errors });
    }
    if (err instanceof HttpError) {
      res.status(err.code).send({ message: err.message });
    }
    res.status(500).send({ message: "Internal Server Error" });
  });
  return app;
};
