import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getBoard } from "../controllers/pipeline-board.controller.js";

const router = Router();

router.use(authMiddleware);
router.get("/:jobId", getBoard);

export default router;
