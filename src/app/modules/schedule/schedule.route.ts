import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import { createScheduleZodSchema, deleteScheduleZodSchema } from "./schedule.validation";

const router = Router();

router.get("/",
      checkAuth(UserRole.ADMIN, UserRole.DOCTOR),
      ScheduleController.getSchedules
);
router.post("/",
      checkAuth(UserRole.ADMIN),
      validateRequest(createScheduleZodSchema),
      ScheduleController.createSchedule
);
router.delete("/:id",
      checkAuth(UserRole.ADMIN),
      validateRequest(deleteScheduleZodSchema),
      ScheduleController.deleteSchedule
);

export const ScheduleRoutes = router;