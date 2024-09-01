import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username must be atleast to character")
  .max(20, "username must not be more than 20 character")
  .regex(/^[a-zA-Z0-9-_]+$/gi, "username must not contain special character");

export const singUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 character" }),
});
