import z from "zod";

export const adPackageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string({ invalid_type_error: "price must be a number" })
    .min(1, "price must be greater than 0"),
  duration: z
    .string({ invalid_type_error: "Duration must be a number" })
    .min(1, "Duration must be greater than 0"),
});
