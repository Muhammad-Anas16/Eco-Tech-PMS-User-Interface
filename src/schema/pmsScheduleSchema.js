import { z } from "zod";

export const pmsScheduleSchema = z.object({
  machineId: z.string().min(1, "Please select the primary machine."),
  machine2Id: z.string().optional().or(z.literal("")),
  machine3Id: z.string().optional().or(z.literal("")),
  machine4Id: z.string().optional().or(z.literal("")),
  machine5Id: z.string().optional().or(z.literal("")),
  plant: z.string().trim().max(100).optional().or(z.literal("")),
  remarks: z.string().trim().max(300).optional().or(z.literal("")),
  frequencyDays: z.coerce.number().min(1, "Must be at least 1 day."),
  nextDueDate: z.string().min(1, "Next due date is required."),
  status: z.enum(["Active", "Completed"]),
  isActive: z.boolean(),
});

export const pmsScheduleDefaultValues = {
  machineId: "",
  machine2Id: "",
  machine3Id: "",
  machine4Id: "",
  machine5Id: "",
  plant: "",
  remarks: "",
  frequencyDays: 30,
  nextDueDate: "",
  status: "Active",
  isActive: true,
};
