import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt";
import config from "../config";
import ApiError from "../errors/ApiError";
import httpStatus from 'http-status';

export const checkAuth = (...roles: string[]) =>
      async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
            try {
                  const token = req.headers.accessToken || req.cookies.accessToken;
                  if (!token) {
                        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!")
                  };

                  const verifiedUser = verifyToken(token, config.jwt.access_secret);
                  req.user = verifiedUser;

                  if (roles.length && !roles.includes(verifiedUser.role)) {
                        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!")
                  }
                  next()
            } catch (error) {
                  next(error)
            }
      };