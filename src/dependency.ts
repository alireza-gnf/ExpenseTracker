import { ExpenseService } from "./services/Expense.service";
import { GroupService } from "./services/Group.service";
import { GroupUserService } from "./services/GroupUser.service";
import { UserService } from "./services/User.service";

export const userService = new UserService();
export const groupService = new GroupService();
export const groupUserService = new GroupUserService();
export const expenseService = new ExpenseService();
