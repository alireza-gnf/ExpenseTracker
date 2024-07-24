import { GroupId } from "./Group.model";
import { UserId } from "./User.model";

export type ExpenseId = {
  value: string;
  type: "expense";
};
export interface Expense {
  id: ExpenseId;
  groupId: GroupId;
  userId: UserId;
  amount: number;
  description: string;
}

export const expenses: Array<Expense> = [];
