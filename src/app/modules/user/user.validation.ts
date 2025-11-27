import { Gender } from "@prisma/client";
import z from "zod";


const patientSchema = z.object({
      name: z.string({ error: "Name is required" }),
      email: z.email(),
      address: z.string().optional()
});
const adminSchema = z.object({
      name: z.string({ error: "Name is required" }),
      email: z.email(),
      contactNumber: z.string({ error: "Contact number is required" }),
      address: z.string().optional()
});
const doctorSchema = z.object({
      name: z.string({ error: "Name is required" }),
      email: z.email(),
      contactNumber: z.string({ error: "Contact number is required" }),
      address: z.string().optional(),
      registrationNumber: z.string({ error: "Registration number is required" }),
      experience: z.number().optional(),
      gender: z.enum(Object.values(Gender)),
      appointmentFee: z.number({ error: "Appointment fee is required" }),
      qualification: z.string({ error: "Qualification is required" }),
      currentWorkingPlace: z.string({ error: "Current workplace is required" }),
      designation: z.string({ error: "Designation is required" })
});


const createPatientZodSchema = z.object({
      password: z.string({ error: "Password is required" })
            .min(8, { error: "Password must be 8 characters long" })
            .max(14, { error: "Password cannot exceed 14 characters." }),
      patient: patientSchema
});

const createAdminZodSchema = z.object({
      password: z.string({ error: "Password is required" })
            .min(8, { error: "Password must be 8 characters long" })
            .max(14, { error: "Password cannot exceed 14 characters." }),
      admin: adminSchema

});

const createDoctorZodSchema = z.object({
      password: z.string({ error: "Password is required" })
            .min(8, { error: "Password must be 8 characters long" })
            .max(14, { error: "Password cannot exceed 14 characters." }),
      doctor: doctorSchema
});


export const UserValidation = {
      createPatientZodSchema,
      createAdminZodSchema,
      createDoctorZodSchema
};