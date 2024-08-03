import { Router } from "express";
import { createGroupSchema } from "../module/dto/group.dto";
import { addMemberSchema } from "../module/dto/addMember.dto";
import { GroupService } from "../services/group.service";
import { UserService } from "../services/user.service";
import { handleExpress } from "../module/utilities/handle-express";

export const makeGroupRouter = (
  groupService: GroupService,
  userService: UserService
) => {
  const app = Router();

  app.post("/", (req, res) => {
    const dto = createGroupSchema.parse(req.body);
    handleExpress(res, 201, () => groupService.create(dto, req.user));
  });

  // Implement find resource for param middleware
  app.post("/:id/add-member", (req, res) => {
    const dto = addMemberSchema.parse(req.body);
    handleExpress(res, 201, () =>
      groupService.addMember(dto.userId, req.params.id, userService)
    );
  });

  return app;
};
