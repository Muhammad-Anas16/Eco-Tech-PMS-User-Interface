import { z } from "zod";

export const operatorSchema = z.object({
  operatorCode: z
    .string()
    .trim()
    .min(2, "Operator code is required.")
    .max(30, "Operator code cannot exceed 30 characters."),

  operatorName: z
    .string()
    .trim()
    .min(2, "Operator name must be at least 2 characters.")
    .max(100, "Operator name cannot exceed 100 characters."),

  plantName: z
    .string()
    .trim()
    .max(100, "Plant name cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  isActive: z.boolean(),
});

export const operatorDefaultValues = {
  operatorCode: "",
  operatorName: "",
  plantName: "",
  isActive: true,
};
