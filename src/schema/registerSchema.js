import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(30, "First name is too long"),

  employeeId: z
    .string()
    .min(4, "Employee ID is required")
    .max(20, "Employee ID is too long"),

  email: z.string().email("Please enter a valid email"),

  role: z.string().min(1, "Please select a role"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain one special character"),
});
