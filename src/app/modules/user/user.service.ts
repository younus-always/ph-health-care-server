import config from "../../config";
import { prisma } from "../../utils/prisma";
import { ICreatePatient } from "./user.interface";
import bcryptjs from "bcryptjs";

const createPatient = async (payload: ICreatePatient) => {
      const hashedPassword = await bcryptjs.hash(payload.password, Number(config.salt_round));

      const result = await prisma.$transaction(async (tnx) => {
            await tnx.user.create({
                  data: {
                        email: payload.email,
                        password: hashedPassword
                  }
            });

            return await tnx.patient.create({
                  data: {
                        name: payload.name,
                        email: payload.email
                  }
            })
      });

      return result;
}

export const UserService = {
      createPatient
};