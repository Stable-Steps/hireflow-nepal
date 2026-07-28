import { Router } from "express";

import * as EmailController from "../controllers/email.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/application/:applicationId", EmailController.getEmails);

router.get("/:id", EmailController.getEmailById);

router.post("/", EmailController.createEmail);

router.patch("/:id", EmailController.updateEmail);

router.delete("/:id", EmailController.deleteEmail);

export default router;
