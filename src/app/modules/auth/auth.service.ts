import { UserStatus } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import bcryptjs from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { generateToken } from "../../utils/jwt";

const login = async (payload: { email: string, password: string }) => {
      const user = await prisma.user.findUniqueOrThrow({
            where: {
                  email: payload.email,
                  status: UserStatus.ACTIVE
            }
      });

      const isMatchedPassword = await bcryptjs.compare(payload.password, user.password);
      if (!isMatchedPassword) {
            throw new Error("Password is incorrect");
      };

      const jwtPayload = {
            email: user.email,
            role: user.role
      };

      const accessToken = generateToken(jwtPayload, config.jwt.access_secret, config.jwt.access_expiresIn);
      const refreshToken = generateToken(jwtPayload, config.jwt.refresh_secret, config.jwt.refresh_expiresIn);



      return {
            accessToken,
            refreshToken,
            needPasswordChange:user.needPasswordChange
      };
};


export const AuthService = {
      login
};