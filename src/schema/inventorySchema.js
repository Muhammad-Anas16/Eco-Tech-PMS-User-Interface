import { z } from "zod";

export const inventorySchema = z.object({
  itemCode: z
    .string()
    .trim()
    .min(2, "Item code is required.")
    .max(30, "Item code cannot exceed 30 characters."),

  itemName: z
    .string()
    .trim()
    .min(2, "Item name must be at least 2 characters.")
    .max(100, "Item name cannot exceed 100 characters."),

  category: z
    .string()
    .trim()
    .max(100, "Category cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  unit: z
    .string()
    .trim()
    .max(30, "Unit cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),

  quantity: z.coerce.number().min(0, "Quantity cannot be negative."),

  minimumStock: z.coerce.number().min(0, "Minimum stock cannot be negative."),

  location: z
    .string()
    .trim()
    .max(100, "Location cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  supplier: z
    .string()
    .trim()
    .max(100, "Supplier cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  unitPrice: z.coerce.number().min(0, "Unit price cannot be negative."),

  status: z.enum(["Available", "Low Stock", "Out of Stock"], {
    errorMap: () => ({
      message: "Please select a valid status.",
    }),
  }),
});

export const inventoryDefaultValues = {
  itemCode: "",
  itemName: "",
  category: "",
  unit: "",
  quantity: 0,
  minimumStock: 0,
  location: "",
  supplier: "",
  unitPrice: 0,
  status: "Available",
};
