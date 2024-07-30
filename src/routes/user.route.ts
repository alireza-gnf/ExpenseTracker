import { Router } from "express";
import { createExpenseSchema } from "../modules/dto/expense.dto";
import {
  expenseService,
  groupService,
  groupUserService,
  userService,
} from "../dependency";

export const app = Router();

app.post("/expenses", (req, res) => {
  const userId = req.user.id;
  const dto = createExpenseSchema.parse(req.body);
  const newExpense = expenseService.create(
    dto,
    userId,
    userService,
    groupService,
    groupUserService
  );
  res.status(201).send({ data: newExpense });
});

app.get("/expenses", (req, res) => {
  res
    .status(200)
    .send({ data: userService.userExpenses(req.user.id, expenseService) });
});

app.get("/group-expenses", (req, res) => {
  res.status(200).send({
    data: userService.groupsExpenses(
      req.user.id,
      groupService,
      groupUserService,
      expenseService
    ),
  });
});
