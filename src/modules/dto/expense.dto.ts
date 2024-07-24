import { z } from "zod";
import { findById } from "../../model/Base.model";
import { userGroups } from "../../model/User.model";
import { groupUsersPivot as pivot } from "../../model/GroupUser.model";
import { groups } from "../../model/Group.model";

export const createExpenseSchema = z
  .object({
    groupId: z.string(),
    userId: z.string(),
    amount: z.coerce.number().min(5000),
    description: z.string().min(5).max(50),
  })
  .superRefine((data, ctx) => {
    if (!findById(data.groupId, groups)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "group not found",
        fatal: true,
      });
      return z.NEVER;
    }

    const thisUserGroups = userGroups(
      { value: data.userId, type: "user" },
      pivot,
      groups
    ).find((group) => group.id.value === data.groupId);
    if (thisUserGroups === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "user is not a member of this group",
      });
    }
  });
