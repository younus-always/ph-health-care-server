import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../config";
import { Prisma } from "@prisma/client";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
      if (config.node_env === "development") {
            console.log(`Error from globalErrorHandler: ${err}`);
      };

      let success = false;
      let statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
      let message = err.message || "Something went wrong!";
      let error = err;

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P1000") {
                  message = "Authentication failed against database error!"
                  error = err.meta
                  statusCode = httpStatus.BAD_REQUEST
            }
            if (err.code === "P2002") {
                  message = "Duplicate key error!"
                  error = err.meta
                  statusCode = httpStatus.CONFLICT
            }
            if (err.code === "P2003") {
                  message = "Foreign key constraint failed!"
                  error = err.meta
                  statusCode = httpStatus.BAD_REQUEST
            }
      }
      else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
            message = "Unknown Prisma Error Occurred!"
            error = err.message
            statusCode = httpStatus.BAD_REQUEST
      }
      else if (err instanceof Prisma.PrismaClientValidationError) {
            message = "Validation Error!"
            error = err.message
            statusCode = httpStatus.BAD_REQUEST
      }
      else if (err instanceof Prisma.PrismaClientInitializationError) {
            message = "Prisma client failed to initialize!"
            error = err.message
            statusCode = httpStatus.BAD_REQUEST
      }

      res.status(statusCode).json({
            success,
            statusCode,
            message,
            error
      })

};

