import z from "zod";


const patientSchema = z.object({
      name: z.string({ error: "Name is required" }),
      email: z.email(),
      address: z.string().optional()
});

const createPatientZodSchema = z.object({
      password: z.string({ error: "Password is required" })
            .min(8, { error: "Password must be 8 characters long" })
            .max(14, { error: "Password cannot exceed 14 characters." }),
      patient: patientSchema
});


export const UserValidation = {
      createPatientZodSchema
};