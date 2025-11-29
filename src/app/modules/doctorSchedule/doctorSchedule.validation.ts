import z from "zod";

export const createDoctorScheduleZodSchema = z.object({
      body: z.object({
            scheduleIds: z.array(z.string())
      })
});