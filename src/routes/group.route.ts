import { Router } from "express";
import { createGroupSchema } from "../modules/dto/group.dto";
import { addMemberSchema } from "../modules/dto/addMember.dto";
import { NotFound } from "../modules/utilities/http-error";
import { groupService, groupUserService, userService } from "../dependency";

export const app = Router();

app.post("/", (req, res) => {
  const dto = createGroupSchema.parse(req.body);
  const userId = req.user.id;
  const group = groupService.create(dto, userId, groupUserService);
  res.status(201).send({ data: group });
});

// Implement find resource for param middleware
app.post("/:id/add-member", (req, res) => {
  const group = groupService.findById(req.params.id);
  if (!group) throw new NotFound("Group not found");
  const dto = addMemberSchema.parse(req.body);
  groupService.addMember(dto, group.id, userService, groupUserService);
  res.status(201).send();
});
