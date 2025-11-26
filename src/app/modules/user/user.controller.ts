import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createPatient = catchAsync(async (req: Request, res: Response) => {
      const result = await UserService.createPatient(req);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Patient created successfully",
            data: result
      })
});


export const UserController = {
      createPatient
};