import z from "zod";

export const createScheduleZodSchema = z.object({
      startTime: z.string(),
      endTime: z.string(),
      startDate: z.string(),
      endDate: z.string()
});

export const deleteScheduleZodSchema = z.object({
      id: z.string({ error: "ObjectId is required" })
});