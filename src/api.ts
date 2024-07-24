import express from "express";
import { app as groupRouter } from "./routes/group.route";
import { app as userRouter } from "./routes/user.route";
import { users } from "./model/User.model";
import { findById } from "./model/Base.model";

export const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization === "string") {
    const user = findById(authorization, users);
    if (user) {
      req.user = user;
      next();
      return;
    }
  }
  res.status(401).send("You are not authenticated");
});
app.use("/users", userRouter);
app.use("/groups", groupRouter);
