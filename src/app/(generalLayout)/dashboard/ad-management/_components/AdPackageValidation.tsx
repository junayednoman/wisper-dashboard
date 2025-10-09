import z from "zod";

export const adPackageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  budget: z
    .string({ invalid_type_error: "Budget must be a number" })
    .min(1, "Budget must be greater than 0"),
  duration: z
    .string({ invalid_type_error: "Duration must be a number" })
    .min(1, "Duration must be greater than 0"),
});
