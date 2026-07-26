import { Router } from "express";

import * as InterviewController from "../controllers/interview.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/application/:applicationId", InterviewController.getInterviews);

router.get("/:id", InterviewController.getInterviewById);

router.post("/", InterviewController.createInterview);

router.patch("/:id", InterviewController.updateInterview);

router.delete("/:id", InterviewController.deleteInterview);

export default router;
