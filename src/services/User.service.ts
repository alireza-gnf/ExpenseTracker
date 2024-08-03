import { User, UserWithRelation } from "../model/user.model";
import { CreateExpenseDto } from "../module/dto/expense.dto";
import { CreateUserDto, LoginDto } from "../module/dto/user.dto";
import {
  Forbidden,
  HttpError,
  NotAuthenticated,
  NotFound,
} from "../module/utilities/http-error";
import { IUserRepository } from "../repository/Repository.interface";
import { GroupService } from "./group.service";

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (await this.userRepo.findByUsername(dto.username)) {
      throw new HttpError(400, "Username already exists");
    }

    return this.userRepo.create(dto);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepo.findById(id);
    if (user) return user;
    throw new NotFound();
  }

  async login(dto: LoginDto): Promise<User> {
    const user = await this.userRepo.findByUsername(dto.username);

    if (user && user.password === dto.password) return user;

    throw new NotAuthenticated();
  }

  async addExpense(
    dto: CreateExpenseDto,
    userId: string,
    groupService: GroupService
  ): Promise<UserWithRelation<["expenses"]>> {
    const group = await groupService.findById(dto.groupId);
    if (!group) {
      throw new NotFound("Group not found");
    }

    const user = (await this.userRepo.userWithRelations(userId, ["groups"]))!;
    if (!user.groups.find((gp) => gp.id === group.id))
      throw new Forbidden("You are not a member of this group");

    return await this.userRepo.addExpense(dto, user);
  }

  //   userExpenses(userId: string, expenseService: ExpenseService): Array<Expense> {
  //     return expenseService.userExpenses(userId);
  //   }

  //   groupsExpenses(
  //     userId: string,
  //     groupService: GroupService,
  //     groupUserService: GroupUserService,
  //     expenseService: ExpenseService
  //   ): Array<Expense> {
  //     const userGroups = this.userGroups(userId, groupService, groupUserService);

  //     if (!userGroups.length) {
  //       throw new HttpError(400, "User doesn't have any groups");
  //     }

  //     return expenseService.groupsExpenses(userGroups);
  //   }
}
