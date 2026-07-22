import { z } from "zod";

// schema (pmsSchema.js) me:
export const PMS_STATUSES = [
  "New Job",
  "In-Progress",
  "Pending Verification",
  "Completed",
];

export const pmsSchema = z.object({
  machineId: z.string().min(1, "Please select a machine."),
  assignedTechnicianId: z.string().optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().optional().or(z.literal("")),
  status: z.enum(PMS_STATUSES),
  remarks: z.string().trim().max(300).optional().or(z.literal("")),
});

export const pmsDefaultValues = {
  machineId: "",
  assignedTechnicianId: "",
  startDate: "",
  endDate: "",
  status: "New Job",
  remarks: "",
};
