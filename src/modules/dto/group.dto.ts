import { z } from "zod";

export const createGroupSchema = z.object({
  title: z.string().min(5).max(15),
});
