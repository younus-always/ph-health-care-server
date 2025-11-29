import { Gender } from "@prisma/client";

interface ISpecialties {
      specialtyId: string;
      isDeleted?: boolean;
};

export interface IDoctorUpdatePayload {
      name: string;
      email: string;
      contactNumber: string;
      address: string;
      registrationNumber: string;
      experience: number;
      gender: Gender;
      appointmentFee: number;
      qualification: string;
      currentWorkingPlace: string;
      designation: string;
      isDeleted: boolean;
      specialties: ISpecialties[]
};