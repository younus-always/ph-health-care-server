import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginZodSchema } from "./auth.validation";

const router = Router();

router.post("/login",
      validateRequest(loginZodSchema),
      AuthController.login
);


export const AuthRoutes = router;