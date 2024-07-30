import { v4 } from "uuid";
import { Expense } from "../models/Expense.model";

export interface CreateExpense {
  groupId: string;
  userId: string;
  amount: number;
  description: string;
}

export class ExpenseRepository {
  private expenses: Array<Expense> = [];

  private generateId(): string {
    return v4();
  }

  public create(expense: CreateExpense): Expense {
    const newExpense = { ...expense, id: this.generateId() };
    this.expenses.push(newExpense);
    return newExpense;
  }

  public findBy<K extends keyof Expense>(
    value: Expense[K],
    key: K
  ): Expense | undefined {
    return this.expenses.find((expense) => expense[key] === value);
  }

  public filterBy<K extends keyof Expense>(
    value: Expense[K],
    key: K
  ): Array<Expense> {
    return this.expenses.filter((exp) => exp[key] === value);
  }
}
