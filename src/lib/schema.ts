import { z } from "zod";

// ============================================================
// Lead Form Validation Schema
// ============================================================

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name is too long"),
  budget: z
    .string()
    .min(1, "Please select your monthly ad budget"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
