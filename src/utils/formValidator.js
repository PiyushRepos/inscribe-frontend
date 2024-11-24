import { z } from "zod";

export const RegisterFormSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, "First name should be minimum 3 of characters long"),
  lastName: z.string(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be minimum length of 6 characters"),
});

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be minimum length of 6 characters"),
});
