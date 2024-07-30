import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";

export const authMiddleware =
  (userService: UserService) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (typeof authorization === "string") {
      const user = userService.findById(authorization);
      if (user) {
        req.user = user;
        next();
        return;
      }
    }

    res.status(401).send({ message: "You are not authenticated" });
  };
