import { z } from "zod";

export const assetSchema = z.object({
  assetCode: z
    .string()
    .trim()
    .min(2, "Asset code is required.")
    .max(30, "Asset code cannot exceed 30 characters."),

  assetName: z
    .string()
    .trim()
    .min(2, "Asset name must be at least 2 characters.")
    .max(100, "Asset name cannot exceed 100 characters."),

  category: z
    .string()
    .trim()
    .max(100, "Category cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .max(100, "Location cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  manufacturer: z
    .string()
    .trim()
    .max(100, "Manufacturer cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  serialNumber: z
    .string()
    .trim()
    .max(100, "Serial number cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  status: z.enum(["Active", "Inactive"], {
    errorMap: () => ({
      message: "Please select a valid status.",
    }),
  }),
});

export const assetDefaultValues = {
  assetCode: "",
  assetName: "",
  category: "",
  location: "",
  manufacturer: "",
  serialNumber: "",
  status: "Active",
};
