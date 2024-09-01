import { string, z } from "zod";

export const messageSchema = z.object({
  Content: z
    .string()
    .min(10, { message: "content must be atleast 10 characters" })
    .max(300, { message: "content must be atleast 300 characters" }),
});
