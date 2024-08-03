export interface Expense {
  id: string;
  groupId: string;
  userId: string;
  amount: number;
  description: string;
}

export interface CreateExpense {
  groupId: string;
  amount: number;
  description: string;
}
