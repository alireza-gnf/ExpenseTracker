import { Router } from "express";
import { createGroupSchema } from "../modules/dto/group.dto";
import { ZodError } from "zod";
import { createResource, prepareModel } from "../model/Base.model";
import { Group, groups } from "../model/Group.model";
import { GroupUser, groupUsersPivot } from "../model/GroupUser.model";

export const app = Router();

app.post("/", (req, res) => {
  try {
    const dto = createGroupSchema.parse(req.body);
    const userId = req.user.id;
    const group = prepareModel<Group>({ ...dto, creatorId: userId }, "group");
    createResource(group, groups);
    const groupUser = prepareModel<GroupUser>(
      { groupId: group.id, userId },
      "groupUser"
    );
    createResource(groupUser, groupUsersPivot);
    res.status(201).send({ data: group });
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ messages: e.errors });
    }
  }
});
