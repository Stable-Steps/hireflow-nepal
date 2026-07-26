import { Router } from "express";

import * as ActivityController from "../controllers/activity.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/:applicationId", ActivityController.getActivities);

router.post("/", ActivityController.createActivity);

export default router;
