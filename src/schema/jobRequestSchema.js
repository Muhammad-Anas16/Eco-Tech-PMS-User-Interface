import { z } from "zod";

export const jobRequestSchema = z.object({
  machineId: z.string().min(1, "Please select a machine."),

  requestedByName: z
    .string()
    .trim()
    .min(2, "Requested by name must be at least 2 characters.")
    .max(100, "Cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(300, "Description cannot exceed 300 characters.")
    .optional()
    .or(z.literal("")),
});

export const jobRequestDefaultValues = {
  machineId: "",
  requestedByName: "",
  description: "",
};

export const JOB_REQUEST_STATUSES = ["Open", "In-Progress", "Closed"];
