import { z } from "zod";

export const createSpecialty = z.object({
      title: z.string({
            error: "Title is required!"
      })
});