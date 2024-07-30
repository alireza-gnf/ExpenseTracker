export interface Expense {
  id: string;
  groupId: string;
  userId: string;
  amount: number;
  description: string;
}

export const expenses: Array<Expense> = [];
