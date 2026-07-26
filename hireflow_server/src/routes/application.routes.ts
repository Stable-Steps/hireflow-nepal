import { Router } from "express";

import * as ApplicationController from "../controllers/application.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", ApplicationController.getApplications);

router.post("/", ApplicationController.createApplication);

router.get("/:id", ApplicationController.getApplicationById);

router.patch("/:id", ApplicationController.updateApplication);

router.delete("/:id", ApplicationController.deleteApplication);

router.patch("/:id/move", ApplicationController.moveApplication);

export default router;
