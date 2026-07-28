import { Router } from "express";

import * as AttachmentController from "../controllers/attachment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/:applicationId", AttachmentController.getAttachments);

router.post("/", AttachmentController.createAttachment);

router.get("/:id", AttachmentController.getAttachmentById);

router.patch("/:id", AttachmentController.updateAttachment);

router.delete("/:id", AttachmentController.deleteAttachment);

export default router;
