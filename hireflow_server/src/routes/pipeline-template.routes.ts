import { Router } from "express";

import * as PipelineTemplateController from "../controllers/pipeline-template.controller.js";

import pipelineStageRoutes from "./pipeline-stage.routes.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", asyncHandler(PipelineTemplateController.list));

router.post("/", asyncHandler(PipelineTemplateController.create));

router.get("/:templateId", asyncHandler(PipelineTemplateController.getById));

router.patch("/:templateId", asyncHandler(PipelineTemplateController.update));

router.delete("/:templateId", asyncHandler(PipelineTemplateController.remove));

// Nested Stage Routes

router.use("/:templateId/stages", pipelineStageRoutes);

export default router;
