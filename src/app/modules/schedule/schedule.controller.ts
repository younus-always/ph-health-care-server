import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status';
import { sendResponse } from "../../utils/sendResponse";
import { ScheduleService } from "./schedule.service";
import { pick } from "../../utils/pick";
import { scheduleFilterableFields, } from "./schedule.constants";
import { optionsFields } from "../../constant";
import { IJwtPayload } from "../../types";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
      const result = await ScheduleService.createSchedule(req.body);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Schedule created successfully",
            data: result
      })
});

const getSchedules = catchAsync(async (req: Request & { user?: IJwtPayload }, res: Response) => {
      const filters = pick(req.query, scheduleFilterableFields); // searching, filtering
      const options = pick(req.query, optionsFields);  // sorting, pagination
      const user = req.user as IJwtPayload;

      const result = await ScheduleService.getSchedules(user, filters, options);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All schedule retrieved successfully",
            data: result
      })
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await ScheduleService.deleteSchedule(id);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Schedule deleted successfully",
            data: result
      })
});


export const ScheduleController = {
      createSchedule,
      getSchedules,
      deleteSchedule
};