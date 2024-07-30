import { v4 } from "uuid";
import { User } from "../models/User.model";

export interface CreateUser {
  username: string;
  password: string;
}

// export type ExcludeSensitive = Omit<User, "password">;

export class UserRepository {
  private users: Array<User> = [];
  // private exclude = ["password"];

  private generateId(): string {
    return v4();
  }

  public create(user: CreateUser): User {
    const newUser = { ...user, id: this.generateId() };
    this.users.push(newUser);
    return newUser;
  }

  public findBy<K extends keyof User>(
    value: User[K],
    key: K
  ): User | undefined {
    return this.users.find((user) => user[key] === value);
  }

  // private excludeKeys() {
  //   return;
  // }
}
