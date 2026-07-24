import * as ApplicationService from "./application.service.js";
import * as PipelineTemplateService from "./pipeline-template.service.js";
import * as PipelineStageService from "./pipeline-stage.service.js";

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

  return application;
};
