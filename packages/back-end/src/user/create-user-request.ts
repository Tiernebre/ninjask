import { z } from "zod";

export const createUserRequestSchema = z.object({
  nickname: z.string().min(1),
  password: z.string().min(1),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
