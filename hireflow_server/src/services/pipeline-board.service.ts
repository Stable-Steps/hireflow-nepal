import { supabase } from "../db/supabase.js";
import * as PipelineTemplateService from "./pipeline-template.service.js";
import * as PipelineStageService from "./pipeline-stage.service.js";
import * as ApplicationService from "./application.service.js";

import {
  MoveApplicationDto,
  PipelineBoardApplication,
  PipelineBoardStage,
} from "../types/pipeline-board.types.js";

type DbApplicationRow = {
  id: string;
  candidate_id: string;
  job_id: string;
  pipeline_stage_id: string | null;
  status: string;
  applied_at: string;
  candidate: {
    id: string;
    first_name: string;
    last_name: string;
    headline: string | null;
    current_company: string | null;
    current_position: string | null;
  }[];
};

export const getBoard = async (
  companyId: string,
  jobId: string,
): Promise<PipelineBoardStage[]> => {
  const pipeline = await PipelineTemplateService.getDefaultPipeline(companyId);
  const stages = await PipelineStageService.list(companyId, pipeline.id);

  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      id,
      candidate_id,
      job_id,
      pipeline_stage_id,
      status,
      applied_at,
      candidate:candidates (
        id,
        first_name,
        last_name,
        headline,
        current_company,
        current_position
      )
    `,
    )
    .eq("company_id", companyId)
    .eq("job_id", jobId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const board: PipelineBoardStage[] = stages.map((stage) => ({
    id: stage.id,
    name: stage.name,
    color: stage.color,
    display_order: stage.display_order,
    applications: [],
  }));

  const stageMap = new Map(board.map((stage) => [stage.id, stage]));

  (data as DbApplicationRow[]).forEach((app) => {
    if (!app.candidate) return;

    const stageId = app.pipeline_stage_id ?? stages[0]?.id;
    if (!stageId) return;

    const targetStage = stageMap.get(stageId);
    if (!targetStage) return;

    const item: PipelineBoardApplication = {
      id: app.id,
      candidate_id: app.candidate_id,
      job_id: app.job_id,
      pipeline_stage_id: stageId,
      status: app.status as PipelineBoardApplication["status"],
      applied_at: app.applied_at,
      candidate: app.candidate[0],
    };

    targetStage.applications.push(item);
  });

  return board;
};

export const moveApplication = async (
  companyId: string,
  applicationId: string,
  payload: MoveApplicationDto,
) => {
  const pipeline = await PipelineTemplateService.getDefaultPipeline(companyId);
  const stages = await PipelineStageService.list(companyId, pipeline.id);

  const allowed = stages.some(
    (stage) => stage.id === payload.pipeline_stage_id,
  );
  if (!allowed) {
    throw new Error("Invalid pipeline stage.");
  }

  return ApplicationService.updateApplication(companyId, applicationId, {
    pipeline_stage_id: payload.pipeline_stage_id,
  });
};
