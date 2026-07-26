import { Router } from "express";

import * as NoteController from "../controllers/note.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/:applicationId", NoteController.getNotes);

router.post("/", NoteController.createNote);

router.patch("/:id", NoteController.updateNote);

router.delete("/:id", NoteController.deleteNote);

export default router;
