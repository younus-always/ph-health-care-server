import z from "zod";

export const loginZodSchema = z.object({
      email: z.email(),
      password: z.string({ error: "Password is required" })
            .min(8, "Password must contain 8 characters long")
            .max(14, "Password cannot exceed 14 characters")
});