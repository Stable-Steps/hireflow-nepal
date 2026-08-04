import { supabase } from "../db/supabase.js";
import * as PipelineTemplateService from "./pipeline-template.service.js";
import * as PipelineStageService from "./pipeline-stage.service.js";

import {
  AnalyticsActivityCount,
  AnalyticsOverview,
  AnalyticsPipelineStageCount,
} from "../types/analytics.types.js";

const countRows = async (
  table: string,
  companyId: string,
  filters: Record<string, string | null> = {},
) => {
  let query = supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("company_id", companyId);

  for (const [key, value] of Object.entries(filters)) {
    if (value === null) query = query.is(key, null);
    else query = query.eq(key, value);
  }

  const { count, error } = await query;
  if (error) throw new Error(error.message);

  return count ?? 0;
};

export const getOverview = async (
  companyId: string,
): Promise<AnalyticsOverview> => {
  const [
    totalCandidates,
    totalApplications,
    activeApplications,
    hiredApplications,
    rejectedApplications,
    interviewsScheduled,
    notesAdded,
    emailsSent,
  ] = await Promise.all([
    countRows("candidates", companyId, { deleted_at: null }),
    countRows("applications", companyId, { deleted_at: null }),
    countRows("applications", companyId, {
      deleted_at: null,
      status: "ACTIVE",
    }),
    countRows("applications", companyId, { deleted_at: null, status: "HIRED" }),
    countRows("applications", companyId, {
      deleted_at: null,
      status: "REJECTED",
    }),
    countRows("interviews", companyId, { deleted_at: null }),
    countRows("notes", companyId, { deleted_at: null }),
    countRows("emails", companyId, { deleted_at: null }),
  ]);

  return {
    total_candidates: totalCandidates,
    total_applications: totalApplications,
    active_applications: activeApplications,
    hired_applications: hiredApplications,
    rejected_applications: rejectedApplications,
    interviews_scheduled: interviewsScheduled,
    notes_added: notesAdded,
    emails_sent: emailsSent,
  };
};

export const getPipelineAnalytics = async (
  companyId: string,
  jobId: string,
): Promise<AnalyticsPipelineStageCount[]> => {
  const pipeline = await PipelineTemplateService.getDefaultPipeline(companyId);
  const stages = await PipelineStageService.list(companyId, pipeline.id);

  const { data, error } = await supabase
    .from("applications")
    .select("id, pipeline_stage_id")
    .eq("company_id", companyId)
    .eq("job_id", jobId)
    .is("deleted_at", null);

  if (error) throw new Error(error.message);

  const counts = new Map<string, number>();
  (data ?? []).forEach((row) => {
    if (!row.pipeline_stage_id) return;
    counts.set(
      row.pipeline_stage_id,
      (counts.get(row.pipeline_stage_id) ?? 0) + 1,
    );
  });

  return stages.map((stage) => ({
    stage_id: stage.id,
    name: stage.name,
    color: stage.color,
    display_order: stage.display_order,
    count: counts.get(stage.id) ?? 0,
  }));
};

export const getApplicationActivitySummary = async (
  companyId: string,
  applicationId: string,
): Promise<AnalyticsActivityCount[]> => {
  const { data, error } = await supabase
    .from("activities")
    .select("type")
    .eq("company_id", companyId)
    .eq("application_id", applicationId);

  if (error) throw new Error(error.message);

  const counts = new Map<string, number>();
  (data ?? []).forEach((row) => {
    counts.set(row.type, (counts.get(row.type) ?? 0) + 1);
  });

  return Array.from(counts.entries()).map(([type, count]) => ({
    type,
    count,
  }));
};
