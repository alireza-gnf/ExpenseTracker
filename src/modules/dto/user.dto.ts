import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(2, {
      message: "Username must be more than 2 characters",
    })
    .max(15, {
      message: "Username must be less than 15 characters",
    })
    .regex(/^[A-Za-z\d]+$/, {
      message: "Username could contain only letters and numbers",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be more than 8 characters",
    })
    .max(50, {
      message: "Password must be less than 50 characters",
    })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/, {
      message:
        "Password must contain one lowercase, one uppercase and one digit",
    }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginDto = z.infer<typeof loginSchema>;
