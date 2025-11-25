import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

      let success = false;
      let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      let message = err.message || "Something went wrong!";
      let error = err;

      res.status(statusCode).json({
            success,
            statusCode,
            message,
            error
      })

};

