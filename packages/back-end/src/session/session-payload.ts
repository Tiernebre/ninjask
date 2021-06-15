import { z } from "zod";

export const sessionPayloadSchema = z.object({
  userId: z.number(),
  accessKey: z.string(),
  userFingerprint: z.string(),
});

export type SessionPayload = Readonly<z.infer<typeof sessionPayloadSchema>>;
