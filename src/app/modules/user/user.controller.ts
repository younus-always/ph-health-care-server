import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { pick } from "../../utils/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
      const result = await UserService.createPatient(req);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Patient created successfully",
            data: result
      })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
      const filters = pick(req.query, ["searchTerm", "email", "role", "status"])
      const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

      const result = await UserService.getAllFromDB(filters, options);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All user retrieved successfully",
            data: result
      })
});


export const UserController = {
      createPatient,
      getAllFromDB
};