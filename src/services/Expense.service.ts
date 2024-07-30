import { Expense } from "../models/Expense.model";
import { Group } from "../models/Group.model";
import { CreateExpenseDto } from "../modules/dto/expense.dto";
import { Forbidden, NotFound } from "../modules/utilities/http-error";
import { ExpenseRepository } from "../repositories/Expense.repo";
import { GroupService } from "./Group.service";
import { GroupUserService } from "./GroupUser.service";
import { UserService } from "./User.service";

export class ExpenseService {
  private expenseRepo = new ExpenseRepository();

  create(
    dto: CreateExpenseDto,
    userId: string,
    userService: UserService,
    groupService: GroupService,
    groupUserService: GroupUserService
  ): Expense {
    const group = groupService.findById(dto.groupId);

    if (!group) {
      throw new NotFound("Group not found");
    }

    if (
      !userService
        .userGroups(userId, groupService, groupUserService)
        .find((gp) => gp.id === dto.groupId)
    ) {
      throw new Forbidden("You are not a member of this group");
    }

    return this.expenseRepo.create({ ...dto, userId });
  }

  public userExpenses(userId: string): Array<Expense> {
    return this.expenseRepo.filterBy(userId, "userId");
  }

  public groupsExpenses(groups: Array<Group>): Array<Expense> {
    return groups.reduce((expenses: Array<Expense>, group: Group) => {
      const expense = this.expenseRepo.findBy(group.id, "groupId");
      if (expense) expenses.push(expense);
      return expenses;
    }, []);
  }

  public groupExpenses(groupId: string): Array<Expense> {
    return this.expenseRepo.filterBy(groupId, "groupId");
  }
}
