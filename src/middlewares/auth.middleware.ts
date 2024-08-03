import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export const authMiddleware =
  (userService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (typeof authorization === "string") {
      const user = await userService.findById(authorization);
      if (user) {
        req.user = user;
        next();
        return;
      }
    }

    res.status(401).send({ message: "You are not authenticated" });
  };
