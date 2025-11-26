import { NextFunction, Request, RequestHandler, Response } from "express";
import config from "../config";

export const catchAsync = (fn: RequestHandler) => {
      return async (req: Request, res: Response, next: NextFunction) => {
            try {
                  await fn(req, res, next)
            } catch (error: any) {
                  if (config.node_env === "development") {
                        console.log("Try-Catch Async handler: ", error.message)
                  }
                  next(error)
            }
      }
};