import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IJwtPayload } from "../../types";

const createDoctorSchedule = catchAsync(async (req: Request & { user?: IJwtPayload }, res: Response) => {
      const user = req.user as IJwtPayload;
      const result = await DoctorScheduleService.createDoctorSchedule(user, req.body);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Doctor schedule created successfully",
            data: result
      })
});


export const DoctorScheduleController = {
      createDoctorSchedule
};