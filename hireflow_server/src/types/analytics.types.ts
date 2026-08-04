export interface AnalyticsOverview {
  total_candidates: number;
  total_applications: number;
  active_applications: number;
  hired_applications: number;
  rejected_applications: number;
  interviews_scheduled: number;
  notes_added: number;
  emails_sent: number;
}

export interface AnalyticsPipelineStageCount {
  stage_id: string;
  name: string;
  color: string;
  display_order: number;
  count: number;
}

export interface AnalyticsActivityCount {
  type: string;
  count: number;
}

export interface AnalyticsParams {
  jobId: string;
  applicationId: string;
}
