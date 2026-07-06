import { Router } from "express";

import * as PipelineStageController from "../controllers/pipeline-stage.controller.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

// in the future, if I decide to expose stages independently (for example, /api/pipeline-stages), then I can add authMiddleware back to that router.
// for now, I'm just going to add it to the parent route which is /api/pipeline-templates/:templateId/stages, so that the stages are only accessible through the template they belong to.
// router.use(authMiddleware);

router.get("/", asyncHandler(PipelineStageController.list));

router.post("/", asyncHandler(PipelineStageController.create));

router.get("/:stageId", asyncHandler(PipelineStageController.getById));

router.patch("/:stageId", asyncHandler(PipelineStageController.update));

router.delete("/:stageId", asyncHandler(PipelineStageController.remove));

export default router;
