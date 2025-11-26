import { Request } from "express";
import config from "../../config";
import { prisma } from "../../utils/prisma";
import bcryptjs from "bcryptjs";
import { fileUploader } from "../../utils/fileUploader";

const createPatient = async (req: Request) => {
      if (req.file) {
            const uploadResult = await fileUploader.uploadToCloudinary(req.file);
            req.body.patient.profilePhoto = uploadResult?.secure_url;
      }

      const hashedPassword = await bcryptjs.hash(req.body.password, Number(config.salt_round));

      const result = await prisma.$transaction(async (tnx) => {
            await tnx.user.create({
                  data: {
                        email: req.body.patient.email,
                        password: hashedPassword
                  }
            });

            return await tnx.patient.create({
                  data: req.body.patient
            })
      });

      return result;
}

export const UserService = {
      createPatient
};