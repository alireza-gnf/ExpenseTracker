import { Router } from "express";
import { createExpenseSchema } from "../modules/dto/expense.dto";
import { ZodError } from "zod";
import { createResource, prepareModel } from "../model/Base.model";
import { Expense, expenses } from "../model/Expense.model";
import {
  userExpenses,
  userGroupExpenses,
  userGroups,
} from "../model/User.model";
import { groupUsersPivot } from "../model/GroupUser.model";
import { groups } from "../model/Group.model";

export const app = Router();

app.post("/expenses", (req, res) => {
  const userId = req.user.id;
  try {
    const dto = createExpenseSchema.parse({
      ...req.body,
      userId: userId.value,
    });
    const data = createResource(
      prepareModel<Expense>(
        {
          ...dto,
          userId,
          groupId: {
            value: dto.groupId,
            type: "group",
          },
        },
        "expense"
      ),
      expenses
    );

    res.status(201).send({ data });
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ errors: e.errors });
      return;
    }
  }
});

app.get("/expenses", (req, res) => {
  res.status(200).send(userExpenses(req.user.id, expenses));
});

app.get("/group-expenses", (req, res) => {
  res
    .status(200)
    .send(
      userGroupExpenses(
        userGroups(req.user.id, groupUsersPivot, groups),
        expenses
      )
    );
});
