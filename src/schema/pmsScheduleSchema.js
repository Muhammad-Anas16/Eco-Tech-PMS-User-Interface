import { z } from "zod";

export const pmsScheduleSchema = z.object({
  machineId: z.string().min(1, "Please select the primary machine."),
  machine2Id: z.string().optional().or(z.literal("")),
  machine3Id: z.string().optional().or(z.literal("")),
  machine4Id: z.string().optional().or(z.literal("")),
  machine5Id: z.string().optional().or(z.literal("")),
  plant: z.string().trim().max(100).optional().or(z.literal("")),
  remarks: z.string().trim().max(300).optional().or(z.literal("")),
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
  isActive: true,
};
