import { Router } from "express";

import * as CandidateController from "../controllers/candidate.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);

router.get("/", CandidateController.getCandidates);

router.post("/", CandidateController.createCandidate);

router.get("/:id", CandidateController.getCandidateById);

router.patch("/:id", CandidateController.updateCandidate);

router.delete("/:id", CandidateController.deleteCandidate);

export default router;
