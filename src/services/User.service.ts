import { Expense } from "../models/Expense.model";
import { Group } from "../models/Group.model";
import { GroupUser } from "../models/GroupUser.model";
import { User } from "../models/User.model";
import { CreateUserDto, LoginDto } from "../modules/dto/user.dto";
import {
  HttpError,
  NotAuthenticated,
  NotFound,
} from "../modules/utilities/http-error";
import { UserRepository } from "../repositories/User.repo";
import { ExpenseService } from "./Expense.service";
import { GroupService } from "./Group.service";
import { GroupUserService } from "./GroupUser.service";

export class UserService {
  private userRepo = new UserRepository();

  create(dto: CreateUserDto): User {
    if (this.userRepo.findBy(dto.username, "username")) {
      throw new HttpError(400, "Username already exists");
    }

    return this.userRepo.create(dto);
  }

  findById(id: string): User {
    const user = this.userRepo.findBy(id, "id");
    if (user) return user;
    throw new NotFound();
  }

  login(dto: LoginDto): User {
    const user = this.userRepo.findBy(dto.username, "username");

    if (user && user.password === dto.password) return user;

    throw new NotAuthenticated();
  }

  userGroups(
    userId: string,
    groupService: GroupService,
    groupUserService: GroupUserService
  ): Array<Group> {
    return groupUserService
      .filterBy(userId, "userId")
      .reduce((groups: Array<Group>, groupUser: GroupUser) => {
        const group = groupService.findById(groupUser.groupId);
        if (group) groups.push(group);
        return groups;
      }, []);
  }

  userExpenses(userId: string, expenseService: ExpenseService): Array<Expense> {
    return expenseService.userExpenses(userId);
  }

  groupsExpenses(
    userId: string,
    groupService: GroupService,
    groupUserService: GroupUserService,
    expenseService: ExpenseService
  ): Array<Expense> {
    const userGroups = this.userGroups(userId, groupService, groupUserService);

    if (!userGroups.length) {
      throw new HttpError(400, "User doesn't have any groups");
    }

    return expenseService.groupsExpenses(userGroups);
  }
}
