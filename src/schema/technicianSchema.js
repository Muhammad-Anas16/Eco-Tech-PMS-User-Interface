import { z } from "zod";

export const technicianSchema = z.object({
  techCode: z
    .string()
    .trim()
    .min(2, "Technician code is required.")
    .max(30, "Technician code cannot exceed 30 characters."),

  techName: z
    .string()
    .trim()
    .min(2, "Technician name must be at least 2 characters.")
    .max(100, "Technician name cannot exceed 100 characters."),

  techDesignation: z
    .string()
    .trim()
    .max(100, "Designation cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  cellNo: z
    .string()
    .trim()
    .max(20, "Cell number cannot exceed 20 characters.")
    .optional()
    .or(z.literal("")),

  employeeCode: z
    .string()
    .trim()
    .max(30, "Employee code cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),

  plantName: z
    .string()
    .trim()
    .max(100, "Plant name cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  type: z.enum(["Internal", "External"], {
    errorMap: () => ({
      message: "Please select a valid type.",
    }),
  }),

  isActive: z.boolean(),
});

export const technicianDefaultValues = {
  techCode: "",
  techName: "",
  techDesignation: "",
  cellNo: "",
  employeeCode: "",
  plantName: "",
  type: "Internal",
  isActive: true,
};
