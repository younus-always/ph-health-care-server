import { NextFunction, Request, Response, Router } from "express";
import { SpecialtiesController } from "./specialties.controller";
import { fileUploader } from "../../utils/fileUploader";
import { createSpecialty } from "./specialties.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
      '/',
      SpecialtiesController.getAllSpecialty
);
router.post(
      '/',
      fileUploader.upload.single('file'),
      (req: Request, res: Response, next: NextFunction) => {
            req.body = createSpecialty.parse(JSON.parse(req.body.data))
            return SpecialtiesController.createSpecialty(req, res, next)
      }
);
router.delete(
      '/:id',
      checkAuth(UserRole.ADMIN, UserRole.ADMIN),
      SpecialtiesController.deleteSpecialty
);

export const SpecialtiesRoutes = router;