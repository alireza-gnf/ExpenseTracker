import { z } from "zod";

export const createExpenseSchema = z.object({
  groupId: z.string(),
  amount: z.coerce.number().min(5000),
  description: z.string().min(5).max(50),
});

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;
