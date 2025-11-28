import { Router } from "express";
import { ScheduleController } from "./schedule.controller";

const router=Router();

router.get("/", ScheduleController.getSchedules);
router.post("/", ScheduleController.createSchedule);
router.delete("/:id", ScheduleController.deleteSchedule);

export const ScheduleRoutes =router;