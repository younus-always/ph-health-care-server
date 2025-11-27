import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { pick } from "../../utils/pick";
import { userFilterableFields, userOptionsFields } from "./user.constants";

const createPatient = catchAsync(async (req: Request, res: Response) => {
      const result = await UserService.createPatient(req);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Patient created successfully",
            data: result
      })
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
      const result = await UserService.createAdmin(req);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Admin created successfully",
            data: result
      })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
      const result = await UserService.createDoctor(req);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Doctor created successfully",
            data: result
      })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
      const filters = pick(req.query, userFilterableFields); // searching, filtering
      const options = pick(req.query, userOptionsFields);  // sorting, pagination

      const result = await UserService.getAllFromDB(filters, options);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All user retrieved successfully",
            meta: result.meta,
            data: result.data
      })
});


export const UserController = {
      createPatient,
      createAdmin,
      createDoctor,
      getAllFromDB
};