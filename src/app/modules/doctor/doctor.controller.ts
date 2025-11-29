import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DoctorService } from './doctor.service';
import httpStatus from 'http-status';
import { pick } from "../../utils/pick";
import { optionsFields } from "../../constant";
import { doctorFilterableFields } from "./doctor.constant";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
      const options = pick(req.query, optionsFields);
      const filters = pick(req.query, doctorFilterableFields)

      const result = await DoctorService.getAllDoctors(filters, options);

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All doctor retrieved successfully",
            meta: result.meta,
            data: result.data
      })
});

export const DoctorController = {
      getAllDoctors
};