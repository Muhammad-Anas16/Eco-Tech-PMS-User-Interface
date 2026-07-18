import { z } from "zod";

export const machineLocationSchema = z.object({
  machineId: z.string().min(1, "Please select a machine.").or(z.number()),

  locationCode: z
    .string()
    .trim()
    .max(30, "Location code cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),

  locationName: z
    .string()
    .trim()
    .min(2, "Location name must be at least 2 characters.")
    .max(100, "Location name cannot exceed 100 characters."),
});

export const machineLocationDefaultValues = {
  machineId: "",
  locationCode: "",
  locationName: "",
};
