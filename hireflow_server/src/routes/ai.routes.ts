import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import * as AIController from "../controllers/ai.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/match", AIController.matchCandidateToJob);

export default router;
