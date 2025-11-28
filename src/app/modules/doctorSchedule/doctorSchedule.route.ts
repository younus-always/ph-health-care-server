import { Router } from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/",
      checkAuth(UserRole.DOCTOR),
      DoctorScheduleController.createDoctorSchedule
);

export const DoctorScheduleRoutes = router;