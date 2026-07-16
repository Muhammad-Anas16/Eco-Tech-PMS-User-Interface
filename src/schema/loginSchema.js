import { z } from "zod";

export const loginSchema = z.object({
  employeeId: z.string().min(4, "Employee ID is required"),

  role: z.string().min(1, "Please select your role"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});
