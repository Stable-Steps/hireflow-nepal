import * as ApplicationService from "./application.service.js";
import * as PipelineTemplateService from "./pipeline-template.service.js";
import * as PipelineStageService from "./pipeline-stage.service.js";
import * as ActivityService from "./activity.service.js";
import { ActivityType } from "../constants/activity.js";

import {
  Application,
  CreateApplicationDto,
} from "../types/application.types.js";

import { ApplicationStatus } from "../constants/application.js";

export const applyCandidate = async (
  companyId: string,
  payload: CreateApplicationDto,
): Promise<Application> => {
  // Get default pipeline
  const pipeline = await PipelineTemplateService.getDefaultPipeline(companyId);

  // Get first stage (Applied)
  const firstStage = await PipelineStageService.getFirstStage(pipeline.id);

  // Create application
  const application = await ApplicationService.createApplication(companyId, {
    ...payload,
    pipeline_stage_id: firstStage.id,
    status: ApplicationStatus.ACTIVE,
  });
  console.log("Application created:", application.id);
  try {
    await ActivityService.createActivity(companyId, {
      application_id: application.id,
      actor_id: null, // later: req.user.id
      type: ActivityType.APPLICATION_CREATED,
      description: "Candidate applied to job",
      metadata: {
        candidate_id: application.candidate_id,
        job_id: application.job_id,
        pipeline_stage_id: application.pipeline_stage_id,
      },
    });
  } catch (error) {
    console.error("Failed to create activity:", error);
  }
  return application;
};
