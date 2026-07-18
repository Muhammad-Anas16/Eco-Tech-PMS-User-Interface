import { z } from "zod";

export const machineSchema = z.object({
  machineCode: z
    .string()
    .trim()
    .min(2, "Machine code is required.")
    .max(30, "Machine code cannot exceed 30 characters."),

  machineName: z
    .string()
    .trim()
    .min(3, "Machine name must be at least 3 characters.")
    .max(100, "Machine name cannot exceed 100 characters."),

  plant: z
    .string()
    .trim()
    .max(100, "Plant cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  status: z.enum(["Active", "Inactive"], {
    errorMap: () => ({
      message: "Please select a valid status.",
    }),
  }),
});

export const machineDefaultValues = {
  machineCode: "",
  machineName: "",
  plant: "",
  status: "Active",
};
