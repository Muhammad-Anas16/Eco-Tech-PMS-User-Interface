import { z } from "zod";

export const authoritySchema = z.object({
  authorityName: z
    .string()
    .trim()
    .min(2, "Authority name must be at least 2 characters.")
    .max(100, "Authority name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(300, "Description cannot exceed 300 characters.")
    .optional()
    .or(z.literal("")),

  isActive: z.boolean(),
});

export const authorityDefaultValues = {
  authorityName: "",
  description: "",
  isActive: true,
};
