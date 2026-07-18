import { z } from "zod";

export const faultSchema = z.object({
  faultName: z
    .string()
    .trim()
    .min(2, "Fault name must be at least 2 characters.")
    .max(150, "Fault name cannot exceed 150 characters."),

  // Optional — koi specific machine na bhi ho to chalega
  machineId: z.string().optional().or(z.literal("")),

  isActive: z.boolean(),
});

export const faultDefaultValues = {
  faultName: "",
  machineId: "",
  isActive: true,
};
