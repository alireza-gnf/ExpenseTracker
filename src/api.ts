import express, { NextFunction, Request, Response } from "express";
import { app as GroupRouter } from "./routes/group.route";
import { app as UserRouter } from "./routes/user.route";
import { app as AuthRouter } from "./routes/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { userService } from "./dependency";
import { ZodError } from "zod";
import { HttpError } from "./modules/utilities/http-error";

export const app = express();
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/users", authMiddleware(userService), UserRouter);
app.use("/groups", authMiddleware(userService), GroupRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).send({ message: err.errors });
  }
  if (err instanceof HttpError) {
    res.status(err.code).send({ message: err.message });
  }
  res.status(500).send({ message: "Internal Server Error" });
});
