import { z } from "zod";

//  Login Schema

export const loginSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),

  password: z.string().min(1, "Password is required"),
});

//  Register Schema

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name is too long"),

  employeeId: z
    .string()
    .min(4, "Employee ID is required")
    .max(20, "Employee ID is too long"),

  role: z.string().min(1, "Please select a role"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
