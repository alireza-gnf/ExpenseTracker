import { User } from "./src/model/User.model";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
