import { Router } from "express";

import {
  getCurrentCompany,
  getCompanyById,
  updateCompany,
  createCompany,
} from "../controllers/company.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createCompany);

router.get("/", getCurrentCompany);

router.get("/:id", getCompanyById);

router.patch("/", updateCompany);

export default router;
