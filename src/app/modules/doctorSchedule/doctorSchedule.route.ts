import { Router } from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDoctorScheduleZodSchema } from "./doctorSchedule.validation";

const router = Router();

router.post("/",
      checkAuth(UserRole.DOCTOR),
      validateRequest(createDoctorScheduleZodSchema),
      DoctorScheduleController.createDoctorSchedule
);

export const DoctorScheduleRoutes = router;