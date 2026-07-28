import express from "express";
import cors from "cors";

import jobRoutes from "./routes/job.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

import { authMiddleware } from "./middleware/auth.middleware.js";

import { login } from "./controllers/job.controller.js";
import companyRoutes from "./routes/company.routes.js";
import pipelineTemplateRoutes from "./routes/pipeline-template.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import pipelineBoardRoutes from "./routes/pipeline-board.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import noteRoutes from "./routes/note.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import attachmentRoutes from "./routes/attachment.routes.js";
import emailRoutes from "./routes/email.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "HireFlow API running",
  });
});

app.use("/api/jobs", jobRoutes);
app.use("/api/company", companyRoutes);

app.use("/api/pipeline-templates", pipelineTemplateRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api/pipeline-board", pipelineBoardRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/emails", emailRoutes);

// test route to check auth middleware -- start
app.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.post("/login", login);

// test route to check auth middleware -- end

app.use(errorHandler);

export default app;
