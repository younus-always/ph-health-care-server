import { Request } from "express";
import config from "../../config";
import { prisma } from "../../utils/prisma";
import bcryptjs from "bcryptjs";
import { fileUploader } from "../../utils/fileUploader";
import { calculatePagination, IOptions } from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import { userSearchableFields } from "./user.constants";

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
};

const getAllFromDB = async (params: any, options: IOptions) => {
      const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
      const { searchTerm, ...filterData } = params;

      const andConditions: Prisma.UserWhereInput[] = [];
      if (searchTerm) {
            andConditions.push({
                  OR: userSearchableFields.map(field => ({
                        [field]: {
                              contains: searchTerm,
                              mode: "insensitive"
                        }
                  }))
            })
      };
      if (Object.keys(filterData).length > 0) {
            andConditions.push({
                  AND: Object.keys(filterData).map(key => ({
                        [key]: {
                              equals: (filterData as any)[key]
                        }
                  }))
            })
      };

      const result = await prisma.user.findMany({
            skip,
            take: limit,
            where: { AND: andConditions },
            orderBy: {
                  [sortBy]: sortOrder
            }
      });
      return result;
};


export const UserService = {
      createPatient,
      getAllFromDB
};