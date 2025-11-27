import { Request } from "express";
import config from "../../config";
import { prisma } from "../../utils/prisma";
import bcryptjs from "bcryptjs";
import { fileUploader } from "../../utils/fileUploader";
import { calculatePagination, IOptions } from "../../utils/pagination";
import { Admin, Prisma, UserRole } from "@prisma/client";
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

const createAdmin = async (req: Request): Promise<Admin> => {
      if (req.file) {
            const uploadResult = await fileUploader.uploadToCloudinary(req.file);
            req.body.admin.profilePhoto = uploadResult?.secure_url;
      };
      const hashedPassword = await bcryptjs.hash(req.body.password, Number(config.salt_round));

      const userData = {
            email: req.body.admin.email,
            password: hashedPassword,
            role: UserRole.ADMIN
      }

      const result = await prisma.$transaction(async (tnx) => {
            await tnx.user.create({
                  data: userData
            });

            return await tnx.admin.create({
                  data: req.body.admin
            })
      });

      return result;
};

const createDoctor = async (req: Request) => {
      if (req.file) {
            const uploadResult = await fileUploader.uploadToCloudinary(req.file);
            req.body.doctor.profilePhoto = uploadResult?.secure_url;
      };
      const hashedPassword = await bcryptjs.hash(req.body.password, Number(config.salt_round));

      const userData = {
            email: req.body.doctor.email,
            password: hashedPassword,
            role: UserRole.DOCTOR
      }

      const result = await prisma.$transaction(async (tnx) => {
            await tnx.user.create({
                  data: userData
            });

            return await tnx.doctor.create({
                  data: req.body.doctor
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

      const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
            AND: andConditions
      } : {};

      const result = await prisma.user.findMany({
            skip,
            take: limit,
            where: whereConditions,
            orderBy: {
                  [sortBy]: sortOrder
            }
      });
      const total = await prisma.user.count({
            where: whereConditions
      });

      return {
            meta: {
                  page,
                  limit,
                  total
            },
            data: result
      };
};


export const UserService = {
      createPatient,
      createAdmin,
      createDoctor,
      getAllFromDB
};