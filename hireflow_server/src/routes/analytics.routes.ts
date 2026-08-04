import { Router } from "express";
import * as AnalyticsController from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/overview", AnalyticsController.getOverview);
router.get("/pipeline/:jobId", AnalyticsController.getPipelineAnalytics);
router.get(
  "/activity/:applicationId",
  AnalyticsController.getApplicationActivitySummary,
);

export default router;
