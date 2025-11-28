import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status';
import { sendResponse } from "../../utils/sendResponse";
import { ScheduleService } from "./schedule.service";
import { pick } from "../../utils/pick";
import { scheduleFilterableFields, scheduleOptionsFields } from "./schedule.constants";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
      const result = await ScheduleService.createSchedule(req.body);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Schedule created successfully",
            data: result
      })
});

const getSchedules = catchAsync(async (req: Request, res: Response) => {
      const filters = pick(req.query, scheduleFilterableFields); // searching, filtering
      const options = pick(req.query, scheduleOptionsFields);  // sorting, pagination

      const result = await ScheduleService.getSchedules(filters, options);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All schedule retrieved successfully",
            data: result
      })
});


export const ScheduleController = {
      createSchedule,
      getSchedules
};