import { z } from "zod";

export const sessionRequestSchema = z.object({
  accessKey: z.string().min(1),
  password: z.string().min(1),
});

export type SessionRequest = Readonly<z.infer<typeof sessionRequestSchema>>;
