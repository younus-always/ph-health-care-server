import { Specialties } from "@prisma/client";
import { fileUploader } from "../../utils/fileUploader";
import { prisma } from "../../utils/prisma";
import { Request } from "express";

const createSpecialty = async (req: Request) => {
      const file = req.file;

      if (file) {
            const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
            req.body.icon = uploadToCloudinary?.secure_url;
      }

      const result = await prisma.specialties.create({
            data: req.body
      });

      return result;
};

const getAllSpecialty = async (): Promise<Specialties[]> => {
      return await prisma.specialties.findMany();
}

const deleteSpecialty = async (id: string): Promise<Specialties> => {
      const result = await prisma.specialties.delete({
            where: {
                  id,
            },
      });
      return result;
};

export const SpecialtiesService = {
      createSpecialty,
      getAllSpecialty,
      deleteSpecialty
}