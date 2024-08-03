import { v4 } from "uuid";
import {
  CreateUser,
  User,
  UserRelations,
  UserWithRelation,
} from "../model/user.model";
import { IUserRepository } from "./Repository.interface";
import { UserEntity } from "../entity/user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateExpense } from "../model/expense.model";

// export type ExcludeSensitive = Omit<User, "password">;

// export class UserArrayRepository implements IUserRepository {
//   private users: Array<User> = [];

//   private generateId(): string {
//     return v4();
//   }

//   async create(user: CreateUser): Promise<User> {
//     const createdUser = { ...user, id: this.generateId() };
//     this.users.push(createdUser);
//     return createdUser;
//   }

//   async findById(id: string): Promise<User | null> {
//     return this.users.find((user) => user.id === id) ?? null;
//   }

//   async findByUsername(username: string): Promise<User | null> {
//     return this.users.find((user) => user.username === username) ?? null;
//   }
// }

export class UserOrmRepository implements IUserRepository {
  private repo: Repository<UserEntity>;
  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(UserEntity);
  }

  async userWithRelations<R extends Array<keyof UserRelations>>(
    id: string,
    selectRelations: R
  ): Promise<UserWithRelation<R> | null> {
    return await this.repo.findOne({
      where: { id },
      relations: selectRelations.reduce(
        (
          prev: { [k in (keyof UserRelations)[number]]: boolean },
          next: keyof UserRelations
        ) => {
          prev[next] = true;
          return prev;
        },
        {}
      ),
    });
  }

  async create(user: CreateUser): Promise<User> {
    return this.repo.save({ ...user, id: v4() });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repo.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repo.findOneBy({ username });
  }

  async addExpense(
    expense: CreateExpense,
    user: User
  ): Promise<UserWithRelation<["expenses"]>> {
    return await this.repo.save({
      ...user,
      expenses: [{ ...expense, id: v4() }],
    });
  }
}
