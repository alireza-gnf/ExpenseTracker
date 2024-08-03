import { Router } from "express";
import { createExpenseSchema } from "../module/dto/expense.dto";
import { UserService } from "../services/user.service";
import { GroupService } from "../services/group.service";
import { handleExpress } from "../module/utilities/handle-express";

export const makeUserRouter = (
  userService: UserService,
  groupService: GroupService
) => {
  const app = Router();

  app.post("/expenses", (req, res) => {
    const dto = createExpenseSchema.parse(req.body);
    handleExpress(res, 201, () =>
      userService.addExpense(dto, req.user.id, groupService)
    );
  });

  // app.get("/expenses", (req, res) => {
  //   res
  //     .status(200)
  //     .send({ data: userService.userExpenses(req.user.id, expenseService) });
  // });

  // app.get("/group-expenses", (req, res) => {
  //   res.status(200).send({
  //     data: userService.groupsExpenses(
  //       req.user.id,
  //       groupService,
  //       groupUserService,
  //       expenseService
  //     ),
  //   });
  // });

  return app;
};
