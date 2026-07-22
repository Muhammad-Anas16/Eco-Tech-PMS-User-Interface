import { z } from "zod";

// Backend VALID_JOB_TYPES se exact match
export const JOB_TYPES = [
  "N/A",
  "Air Conditioning",
  "Annual Inspection",
  "Duct Work",
  "Electrical",
  "Electronic Lab",
  "Fab. Work",
  "Khalasi Work",
  "Lath Workshop",
  "Lift Operations",
  "Mechanical",
  "Misc. work",
  "Paint work",
  "Winding Workshop",
];

export const JOB_CARD_STATUSES = ["In-Progress", "Completed", "Cancelled"];

// Create Job Card — sirf core fields (Day 8)
export const jobCardCreateSchema = z.object({
  machineId: z.string().min(1, "Please select a machine."),
  faultId: z.string().optional().or(z.literal("")),
  operatorId: z.string().optional().or(z.literal("")),
  jobType: z.enum(JOB_TYPES, {
    errorMap: () => ({ message: "Please select a valid job type." }),
  }),
  remarks: z
    .string()
    .trim()
    .max(300, "Cannot exceed 300 characters.")
    .optional()
    .or(z.literal("")),
});

export const jobCardCreateDefaultValues = {
  machineId: "",
  faultId: "",
  operatorId: "",
  jobType: "N/A",
  remarks: "",
};

// Timing/Details update — (Day 9)
export const jobCardTimingSchema = z.object({
  startTime: z.string().optional().or(z.literal("")),
  endTime: z.string().optional().or(z.literal("")),
  machineStop: z.boolean(),
  subLocation: z.string().trim().max(100).optional().or(z.literal("")),
  plant: z.string().trim().max(100).optional().or(z.literal("")),
  remarks: z.string().trim().max(300).optional().or(z.literal("")),
  expenseType: z.string().trim().max(100).optional().or(z.literal("")),
});

export const jobCardTimingDefaultValues = {
  startTime: "",
  endTime: "",
  machineStop: false,
  subLocation: "",
  plant: "",
  remarks: "",
  expenseType: "",
};

// Item Issue (Day 10)
export const jobCardItemSchema = z.object({
  itemCode: z.string().trim().min(1, "Item code is required.").max(30),
  itemName: z.string().trim().min(1, "Item name is required.").max(100),
  quantityIssued: z.coerce.number().min(1, "Quantity must be at least 1."),
  rate: z.coerce.number().min(0, "Rate cannot be negative.").optional(),
  department: z.string().trim().max(100).optional().or(z.literal("")),
});

export const jobCardItemDefaultValues = {
  itemCode: "",
  itemName: "",
  quantityIssued: 1,
  rate: 0,
  department: "",
};
