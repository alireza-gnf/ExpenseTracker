import { ExpenseService } from "./services/expense.service";
import { GroupService } from "./services/group.service";
import { GroupUserService } from "./services/groupUser.service";
import { UserService } from "./services/user.service";

export const userService = new UserService();
export const groupService = new GroupService();
export const groupUserService = new GroupUserService();
export const expenseService = new ExpenseService();
