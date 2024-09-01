import { string, z } from "zod";

export const messageSchema = z.object({
  acceptMessages: z.boolean(),
});
